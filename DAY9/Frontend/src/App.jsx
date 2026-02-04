import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: '', description: '' })

  // Fetch all notes when page loads
  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = () => {
    axios.get('/notes')
      .then(res => setNotes(res.data.notes))
      .catch(err => console.error("Fetch error:", err))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value

    axios.post('/notes', { title, description })
      .then(() => {
        fetchNotes()
        e.target.reset()
      })
      .catch(err => console.error("Create error:", err))
  }

  function handleDelete(id) {
    axios.delete(`/notes/${id}`)
      .then(() => fetchNotes())
      .catch(err => console.error("Delete error:", err))
  }

  function startEdit(note) {
    setEditingId(note._id)
    setEditData({ title: note.title, description: note.description })
  }

  function saveEdit(id) {
    axios.put(`/notes/${id}`, editData)
      .then(() => {
        setEditingId(null)
        setEditData({ title: '', description: '' })
        fetchNotes()
      })
      .catch(err => console.error("Update error:", err))
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="description" placeholder="Description" required></textarea>
        <button type="submit">Add Note</button>
      </form>

      <div className="notes">
        {notes.map(note => (
          <div className="note" key={note._id}>
            {editingId === note._id ? (
              <>
                <input
                  value={editData.title}
                  onChange={e => setEditData({ ...editData, title: e.target.value })}
                />
                <textarea
                  value={editData.description}
                  onChange={e => setEditData({ ...editData, description: e.target.value })}
                />
                <button type="button" onClick={() => saveEdit(note._id)}>SAVE</button>
              </>
            ) : (
              <>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <button type="button" onClick={() => startEdit(note)}>EDIT</button>
                <button type="button" onClick={() => handleDelete(note._id)}>DELETE</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
