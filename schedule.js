const table = document.getElementById("scheduleTable");
const popup = document.getElementById("popup");
const subjectInput = document.getElementById("subjectInput");
const timeInput = document.getElementById("timeInput");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let currentCell = null;

function loadSchedule() {
  const saved = JSON.parse(localStorage.getItem("editableSchedule")) || [];

  const rows = table.rows;
  for (let i = 0; i < saved.length; i++) {
    for (let j = 0; j < saved[i].length; j++) {
      if (rows[i + 1]?.cells[j]) {
        rows[i + 1].cells[j].innerHTML = saved[i][j]; // row 0 is header
      }
    }
  }
}

function saveSchedule() {
  const data = [];
  const rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    const row = [];
    for (let j = 0; j < rows[i].cells.length; j++) {
      row.push(rows[i].cells[j].innerHTML);
    }
    data.push(row);
  }

  localStorage.setItem("editableSchedule", JSON.stringify(data));
}

// Open popup on cell click
table.addEventListener("click", (e) => {
  if (e.target.tagName === "TD") {
    currentCell = e.target;
    subjectInput.value = "";
    timeInput.value = "";

    const [subject, time] = currentCell.innerHTML.split("<br>");
    subjectInput.value = subject?.trim() || "";
    timeInput.value = time?.trim() || "";

    popup.style.display = "flex";
  }
});

// Save data into the cell
saveBtn.addEventListener("click", () => {
  if (currentCell) {
    currentCell.innerHTML = `
      ${subjectInput.value}<br>
      <small>${timeInput.value}</small>
    `.trim();
    saveSchedule();
  }
  popup.style.display = "none";
});

// Cancel edit
cancelBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.onload = loadSchedule;