const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },

  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],

  score:[Number]
});

module.exports = mongoose.model('Match',matchSchema)