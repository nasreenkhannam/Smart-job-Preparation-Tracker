// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  saveData();
}

// Generic helper to load/save from localStorage
const STATE_KEY = "jobTrackerData";
let state = JSON.parse(localStorage.getItem(STATE_KEY)) || {
  skills: [],
  companies: [],
  tasks: []
};

// Save state to localStorage
function saveData() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

// Skill handlers
function renderSkills() {
  const list = document.getElementById("skillList");
  list.innerHTML = "";
  state.skills.forEach((skill, i) => {
    const li = document.createElement("li");
    li.textContent = skill;
    li.onclick = () => {
      state.skills.splice(i, 1);
      saveData();
      renderSkills();
    };
    list.appendChild(li);
  });
}
function addSkill() {
  const input = document.getElementById("skillInput");
  const s = input.value.trim();
  if (s) {
    state.skills.push(s);
    input.value = "";
    saveData();
    renderSkills();
  }
}

// Companies handlers
function renderCompanies() {
  const list = document.getElementById("companyList");
  list.innerHTML = "";
  state.companies.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = c;
    li.onclick = () => {
      state.companies.splice(i, 1);
      saveData();
      renderCompanies();
    };
    list.appendChild(li);
  });
}
function addCompany() {
  const input = document.getElementById("companyInput");
  const c = input.value.trim();
  if (c) {
    state.companies.push(c);
    input.value = "";
    saveData();
    renderCompanies();
  }
}

// Task handlers
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  state.tasks.forEach((t, i) => {
    const li = document.createElement("li");
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = t.done;
    chk.onchange = () => {
      state.tasks[i].done = chk.checked;
      saveData();
      renderTasks();
    };
    li.append(chk, document.createTextNode(t.text));
    list.appendChild(li);
  });
}
function addTask() {
  const input = document.getElementById("taskInput");
  const t = input.value.trim();
  if (t) {
    state.tasks.push({ text: t, done: false });
    input.value = "";
    saveData();
    renderTasks();
  }
}

// Initial render
function init() {
  if (state.theme === "dark") document.body.classList.add("dark");
  renderSkills();
  renderCompanies();
  renderTasks();
}
init();
