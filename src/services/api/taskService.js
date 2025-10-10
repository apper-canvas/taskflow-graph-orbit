import tasksData from "@/services/mockData/tasks.json";

const STORAGE_KEY = "taskflow_tasks";

const loadFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
  return [...tasksData];
};

const saveToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return loadFromStorage();
  },

  async getById(id) {
    await delay(200);
    const tasks = loadFromStorage();
    const task = tasks.find((t) => t.Id === parseInt(id));
    if (!task) throw new Error("Task not found");
    return { ...task };
  },

  async create(taskData) {
    await delay(300);
    const tasks = loadFromStorage();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.Id)) : 0;
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    tasks.push(newTask);
    saveToStorage(tasks);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const tasks = loadFromStorage();
    const index = tasks.findIndex((t) => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    tasks[index] = { ...tasks[index], ...updates };
    saveToStorage(tasks);
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(250);
    const tasks = loadFromStorage();
    const filtered = tasks.filter((t) => t.Id !== parseInt(id));
    saveToStorage(filtered);
    return true;
  },

  async toggleComplete(id) {
    await delay(200);
    const tasks = loadFromStorage();
    const index = tasks.findIndex((t) => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    const task = tasks[index];
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    saveToStorage(tasks);
    return { ...task };
  },
};