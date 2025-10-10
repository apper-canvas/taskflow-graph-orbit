import taskListsData from "@/services/mockData/taskLists.json";

const STORAGE_KEY = "taskflow_lists";

const loadFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskListsData));
  return [...taskListsData];
};

const saveToStorage = (lists) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskListService = {
  async getAll() {
    await delay(250);
    return loadFromStorage();
  },

  async getById(id) {
    await delay(200);
    const lists = loadFromStorage();
    const list = lists.find((l) => l.Id === parseInt(id));
    if (!list) throw new Error("List not found");
    return { ...list };
  },

  async create(listData) {
    await delay(300);
    const lists = loadFromStorage();
    const maxId = lists.length > 0 ? Math.max(...lists.map((l) => l.Id)) : 0;
    const newList = {
      ...listData,
      Id: maxId + 1,
      taskCount: 0,
      createdAt: new Date().toISOString(),
    };
    lists.push(newList);
    saveToStorage(lists);
    return { ...newList };
  },

  async update(id, updates) {
    await delay(300);
    const lists = loadFromStorage();
    const index = lists.findIndex((l) => l.Id === parseInt(id));
    if (index === -1) throw new Error("List not found");
    lists[index] = { ...lists[index], ...updates };
    saveToStorage(lists);
    return { ...lists[index] };
  },

  async delete(id) {
    await delay(250);
    const lists = loadFromStorage();
    const filtered = lists.filter((l) => l.Id !== parseInt(id));
    saveToStorage(filtered);
    return true;
  },

  async updateTaskCount(id, count) {
    await delay(100);
    const lists = loadFromStorage();
    const index = lists.findIndex((l) => l.Id === parseInt(id));
    if (index !== -1) {
      lists[index].taskCount = count;
      saveToStorage(lists);
    }
  },
};