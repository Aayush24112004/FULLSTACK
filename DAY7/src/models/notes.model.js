const mongoose = require('mongoose');
const { title } = require('process');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const NoteModel = mongoose.model('Notes', noteSchema);
module.exports = NoteModel;