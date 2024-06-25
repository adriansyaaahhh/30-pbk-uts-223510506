// stores/taskStore.js
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    showOnlyUncompleted: false,
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
      this.saveTasks();
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    },
    toggleShowOnlyUncompleted() {
      this.showOnlyUncompleted = !this.showOnlyUncompleted;
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasks() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        this.tasks = JSON.parse(tasks);
      }
    }
  },
  getters: {
    filteredTasks: (state) => {
      return state.showOnlyUncompleted ? state.tasks.filter(task => !task.completed) : state.tasks;
    }
  }
});
