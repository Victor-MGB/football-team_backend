const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  goals: {
    type: Number,
    default: 0,
  },
  assists: {
    type: Number,
    default: 0,
  },
  yellowCards: {
    type: Number,
    default: 0,
  },
  redCards: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Statistics", statisticsSchema);