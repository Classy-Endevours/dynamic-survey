const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InputSchema = new Schema({}, {strict: false, timestamps: true});

module.exports = mongoose.model('Input', InputSchema);