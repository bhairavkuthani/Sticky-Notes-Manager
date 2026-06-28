function NoteCard({ note, deleteNote }) {

  const date = new Date(note.createdAt || Date.now());

  return (
    <div className="note-card">

      <h3>{note.title}</h3>

      <p>{note.description}</p>

      <small>
        📅 {date.toLocaleDateString()} &nbsp;
        🕒 {date.toLocaleTimeString()}
      </small>

      <button
        className="delete-btn"
        onClick={() => deleteNote(note.id)}
      >
        🗑 Delete
      </button>

    </div>
  );
}

export default NoteCard;