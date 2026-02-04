import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: '', description: '' })

  useEffect(() => {
    fetchNotes()
  }, [])
  
  const fetchNotes = () => {
    axios.get('http://localhost:3000/notes')
      .then(res => setNotes(res.data.notes))
      .catch(err => console.error(err))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value

    axios.post('http://localhost:3000/notes', { title, description })
      .then(() => {
        fetchNotes()
        e.target.reset()
      })
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/notes/${id}`)
      .then(() => fetchNotes())
      .catch(err => console.error(err))
  }

  function startEdit(note) {
    setEditingId(note._id)
    setEditData({ title: note.title, description: note.description })
  }

  function saveEdit(id) {
    axios.put(`http://localhost:3000/notes/${id}`, editData)
      .then(() => {
        setEditingId(null) // return to normal card
        setEditData({ title: '', description: '' })
        fetchNotes()
      })
      .catch(err => console.error(err))
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
