function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (!title || !content) {
    alert("Please enter both a title and content.");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title, content, timestamp: new Date().toISOString() });

  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  loadNotes();
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <button onclick="viewNote(${index})">👁️ View</button>
      <button onclick="deleteNote(${index})">🗑️ Delete</button>
    `;

    notesList.appendChild(noteCard);
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

function viewNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes[index];
  document.getElementById("noteTitle").value = note.title;
  document.getElementById("noteContent").value = note.content;
}

window.onload = loadNotes;