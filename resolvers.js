const { compareSync, hashSync } = require('bcrypt');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { sign } = require('jsonwebtoken');
const dayjs = require('dayjs');

const Schedule = require('./models/Schedule');
const User = require('./models/User');

module.exports = {
  Query: {
    getSchedules: async (_, __, { user }) => {
      return await Schedule.find({ user });
    }
  },
  Mutation: {
    login: async (_, { input: { email, password } }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        if (!compareSync(password, user.password)) {
          throw new Error('Password is not valid');
        }

        return {
          name: user.name,
          email: user.email,
          token: sign({ id: user.id }, process.env.JWT_SECRET)
        };
      } catch (error) {
        throw error;
      }
    },
    register: async (_, { input: { name, email, password } }) => {
      try {
        if (await User.findOne({ email })) {
          throw new Error('User is registered');
        }

        const newUser = await User.create({
          name,
          email,
          password: hashSync(password, 10)
        });

        return {
          name: newUser.name,
          email: newUser.email,
          token: sign({ id: newUser.id }, process.env.JWT_SECRET)
        };
      } catch (error) {
        throw error;
      }
    },
    addSchedule: async (_, { input }, { user }) => {
      try {
        if (!user) {
          throw new Error('User is not authenticated');
        }

        const newSchedule = await Schedule.create({
          user,
          ...input
        });

        return `Schedule "${newSchedule.title}" created successful`;
      } catch (error) {
        throw error;
      }
    },
    updateSchedule: async (_, { input }, { user }) => {
      try {
        if (!user) {
          throw new Error('User is not authenticated');
        }

        await Schedule.findOneAndUpdate({ _id: input.id, user }, input);
        return 'Schedule updated successful';
      } catch (error) {
        throw error;
      }
    },
    deleteSchedule: async (_, { id }, { user }) => {
      try {
        if (!user) {
          throw new Error('User is not authenticated');
        }

        await Schedule.findOneAndDelete({ _id: id, user });
        return 'Schedule deleted successful';
      } catch (error) {
        throw error;
      }
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    parseValue(value) {
      return dayjs(value); // value from the client
    },
    serialize(value) {
      return dayjs(value).toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return dayjs(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};
