import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import API from "./services/api";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch all notes when the app loads
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a new note
  const addNote = async (note) => {
    try {
      await API.post("/notes", {
        ...note,
        createdAt: new Date(),
      });

      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app">

      <Navbar />

      <NoteForm addNote={addNote} />

      <div className="notes-grid">

        {notes.length === 0 ? (
          <p className="empty-message">
            No notes available. Add your first note!
          </p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default App;