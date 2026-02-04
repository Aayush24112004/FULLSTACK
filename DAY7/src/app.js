// Aayush = 7QdHEzHrQeJNMmqs

// mongodb+srv://Aayush:7QdHEzHrQeJNMmqs@dhingani.z5cn6yc.mongodb.net/

const express = require('express');
const NoteModel = require('./models/notes.model');

const app = express();
app.use(express.json());

app.post('/notes', async(req, res) => {
    const { title, description } = req.body;
   const note = await NoteModel.create({ title, description });
   res.status(201).json({
    message: 'Note created successfully',
    note,
   })
   });

   app.get('/notes', async(req, res) => {
    const notes = await NoteModel.find();
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes,
    });
   });

module.exports = app;