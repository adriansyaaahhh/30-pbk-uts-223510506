<template>
    <div>
      <h2>Daftar Kegiatan</h2>
      <div class="add-task">
        <input v-model="newTask.text" placeholder="Tambahkan kegiatan baru" class="task-input" />
        <input type="date" v-model="newTask.date" class="date-input" />
        <button @click="addTask" class="add-button">Tambah</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Kegiatan</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>
              <input type="checkbox" v-model="task.completed" class="checkbox" />
              <span :class="{ completed: task.completed }">{{ task.text }}</span>
            </td>
            <td :style="{ 'text-decoration': task.completed ? 'line-through' : 'none' }">{{ task.date }}</td>
            <td><button @click="removeTask(task.id)" class="remove-button">Hapus</button></td>
          </tr>
        </tbody>
      </table>
      <button @click="toggleShowOnlyUncompleted" class="filter-button">
        {{ showOnlyUncompleted ? 'Tampilkan Semua' : 'Tampilkan Belum Selesai' }}
      </button>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      newTask: {
        text: '',
        date: '',
        completed: false
      },
      tasks: [],
      showOnlyUncompleted: false
    };
  },
  computed: {
    filteredTasks() {
      if (this.showOnlyUncompleted) {
        return this.tasks.filter(task => !task.completed);
      } else {
        return this.tasks;
      }
    }
  },
  methods: {
    addTask() {
      if (this.newTask.text.trim() && this.newTask.date.trim()) {
        const newTask = {
          id: Date.now(),
          text: this.newTask.text,
          date: this.newTask.date,
          completed: this.newTask.completed
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.newTask.text = '';
        this.newTask.date = '';
      }
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    },
    toggleShowOnlyUncompleted() {
      this.showOnlyUncompleted = !this.showOnlyUncompleted;
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasks();
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
  mounted() {
    this.loadTasks();
  }
};
</script>

  
  <style scoped>
  h2 {
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .add-task {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .task-input {
    padding: 8px;
    margin: 5px 10px 5px 0; 
    border: 1px solid #ccc;
  }
  
  .date-input {
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
  }
  
  .add-button,
  .remove-button,
  .filter-button {
    background-color: #ff6f61;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 10px;
    margin: 5px;
  }

  
  .add-button:hover,
  .remove-button:hover,
  .filter-button:hover {
    background-color: #ff3b30;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .completed {
    text-decoration: line-through;
  }
  </style>
  