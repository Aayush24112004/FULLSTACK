const express = require('express');
const notemodel = require('./model/note.model');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

/* CREATE NOTE */
app.post('/notes', async (req, res) => {
    const { title, description } = req.body;
    const note = await notemodel.create({ title, description });
    res.status(201).json({ message: 'Note created', note });
});

/* GET ALL NOTES */
app.get('/notes', async (req, res) => {
    const notes = await notemodel.find();
    res.status(200).json({ notes });
});

/* DELETE NOTE */
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;

    const deletedNote = await notemodel.findByIdAndDelete(id);

    if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted' });
});


/* UPDATE NOTE */
app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await notemodel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
    );

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated', note });
});


module.exports = app;
