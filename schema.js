const { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  type Auth {
    name: String
    email: String
    token: String!
  }

  type Schedule {
    id: ID!
    title: String!
    category: String
    dueDateClass: String
    start: Date!
    end: Date!
    isReadOnly: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input ScheduleInput {
    title: String!
    category: String
    dueDateClass: String
    start: Date!
    end: Date!
    isReadOnly: Boolean
  }

  input ScheduleUpdateInput {
    id: ID!
    title: String!
    category: String
    dueDateClass: String
    start: Date!
    end: Date!
    isReadOnly: Boolean
  }

  type Query {
    getSchedules: [Schedule]
  }

  type Mutation {
    login(input: LoginInput): Auth
    register(input: RegisterInput): Auth
    addSchedule(input: ScheduleInput): String
    updateSchedule(input: ScheduleUpdateInput): String
    deleteSchedule(id: ID): String
  }
`;
