function loadTasks() {
  const taskList = document.getElementById("taskList");
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    const li = createTaskElement(task.text, task.date, task.done);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = [];

  taskList.querySelectorAll("li").forEach(li => {
    const checkbox = li.querySelector("input[type='checkbox']");
    const span = li.querySelector("span");
    const match = span.innerText.match(/^(.+?) \(Due: (.+?) —/);

    if (match) {
      tasks.push({
        text: match[1],
        date: match[2],
        done: checkbox.checked
      });
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getDaysLeft(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) return `${diffDays} days left`;
  if (diffDays === 1) return `1 day left`;
  if (diffDays === 0) return `Due today!`;
  return `Overdue by ${Math.abs(diffDays)} day(s)`;
}

function createTaskElement(taskText, dueDate, isDone = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isDone;
  checkbox.addEventListener("change", () => {
    span.classList.toggle("done", checkbox.checked);
    saveTasks();
  });

  const span = document.createElement("span");
  span.textContent = `${taskText} (Due: ${dueDate} — ${getDaysLeft(dueDate)})`;
  if (isDone) span.classList.add("done");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskList = document.getElementById("taskList");

  const taskText = taskInput.value.trim();
  const dueDate = taskDate.value;

  if (taskText === "" || dueDate === "") {
    alert("Please enter both a task and a due date.");
    return;
  }

  const li = createTaskElement(taskText, dueDate);
  taskList.appendChild(li);

  saveTasks();

  taskInput.value = "";
  taskDate.value = "";
}

window.onload = loadTasks;