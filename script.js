const themeToggleBtn = document.getElementById("theme-toggle");
const taskList = document.getElementById("task-list");
const checkboxes = taskList.querySelectorAll("input[type='checkbox']");

const STORAGE_KEY = "fittrack-tasks";
const THEME_KEY = "fittrack-theme";

// Load tasks and theme from localStorage
function loadState() {
  const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedTasks && savedTasks.length === checkboxes.length) {
    checkboxes.forEach((cb, i) => {
      cb.checked = savedTasks[i];
    });
  }
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// Save tasks to localStorage
function saveTasks() {
  const checkedStates = Array.from(checkboxes).map((cb) => cb.checked);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedStates));
}

// Save theme to localStorage
function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

// Toggle theme between light and dark
function toggleTheme() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    saveTheme("light");
  } else {
    document.body.classList.add("dark");
    saveTheme("dark");
  }
}

// Check if all tasks completed
function allTasksCompleted() {
  return Array.from(checkboxes).every((cb) => cb.checked);
}

// Reset all tasks after delay
function resetTasks() {
  setTimeout(() => {
    checkboxes.forEach((cb) => (cb.checked = false));
    saveTasks();
    alert("✅ Day completed! Checklist reset.");
  }, 1000);
}

// Event Listeners
themeToggleBtn.addEventListener("click", toggleTheme);

checkboxes.forEach((cb, index) => {
  cb.addEventListener("change", () => {
    saveTasks();
    if (allTasksCompleted()) {
      resetTasks();
    }
  });
});

// Initial load
loadState();
