const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  diameter: {
    type: Number,
    required: true
  },
  distanceFromSun: {
    type: Number,
    required: true
  },
  numberOfMoons: {
    type: Number,
    default: 0
  },
  surfaceTemperature: {
    type: Number,
    required: true
  },
  rotationPeriod: {
    type: Number,
    description: 'Período de rotação em horas terrestres'
  },
  image: {
    type: String,
    required: true
  },
  hasRings: {
    type: Boolean,
    default: false
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Planet', planetSchema); 