// script.js — Step 3

// Select DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks on screen
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item${task.completed ? " completed" : ""}`;

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = task.text;
    span.contentEditable = false;

    // Toggle complete on click
    span.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });

    // Double click to edit
    span.addEventListener("dblclick", () => {
      span.contentEditable = true;
      span.focus();
    });

    span.addEventListener("blur", () => {
      span.contentEditable = false;
      tasks[index].text = span.textContent.trim() || tasks[index].text;
      saveTasks();
    });

    // Controls (edit, delete)
    const controls = document.createElement("div");
    controls.className = "controls";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "🗑";
    deleteBtn.title = "Delete task";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    controls.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(controls);
    taskList.appendChild(li);
  });
}

// Save to localStorage and re-render
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Handle form submit

function handleSubmit(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
}

taskForm.addEventListener("submit", handleSubmit);

// Initial render
renderTasks();
