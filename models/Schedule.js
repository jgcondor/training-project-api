const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'time'
  },
  dueDateClass: {
    type: String,
    default: ''
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  isReadOnly: {
    type: Boolean,
    default: false
  }
});

module.exports = model('Schedule', scheduleSchema);
