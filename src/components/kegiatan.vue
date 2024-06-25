<template>
  <div class="container">
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
import { useTaskStore } from '../stores/taskStore'; // Impor store Pinia
export default {
  props: {
    tasks: Array,
    showOnlyUncompleted: Boolean
  },
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
      const taskStore = useTaskStore();
      return taskStore.filteredTasks;
    }
  },
  methods: {
    addTask() {
      const taskStore = useTaskStore();
      if (this.newTask.text.trim() && this.newTask.date.trim()) {
        const newTask = {
          id: Date.now(),
          text: this.newTask.text,
          date: this.newTask.date,
          completed: this.newTask.completed
        };
        taskStore.addTask(newTask);
        this.newTask.text = '';
        this.newTask.date = '';
      }
    },
    removeTask(id) {
      const taskStore = useTaskStore();
      taskStore.removeTask(id);
    },
    toggleShowOnlyUncompleted() {
      const taskStore = useTaskStore();
      taskStore.toggleShowOnlyUncompleted();
    }
  },
  mounted() {
    const taskStore = useTaskStore();
    taskStore.loadTasks();
  }
};
</script>

<style scoped>
  body {
  background-color: #000; /* Latar belakang hitam untuk seluruh halaman */
  color: #fff; /* Warna teks putih untuk kontras */
  font-family: 'Arial', sans-serif;
}

h2 {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
}

.add-task {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.task-input, .date-input {
  padding: 10px;
  margin: 5px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.add-button, .remove-button, .filter-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin: 5px;
  transition: background-color 0.3s;
}

.add-button:hover, .remove-button:hover, .filter-button:hover {
  background-color: #45a049;
}

.container {
  background-color: #333; /* Latar belakang hitam untuk kontainer utama */
  padding: 20px;
  border-radius: 8px; /* Sudut kontainer yang membulat */
  max-width: 800px; /* Lebar maksimal untuk kontainer */
  margin: auto; /* Tengah-kan kontainer */
  margin-top: 100px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #444; /* Latar belakang hitam untuk tabel */
  color: white; /* Teks putih untuk kontras */
  border-radius: 8px; /* Sudut tabel yang membulat */
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #555; /* Warna border lebih gelap */
}

th {
  background-color: #555; /* Latar belakang sedikit lebih terang untuk header */
  font-size: 18px;
}

tr:nth-child(even) {
  background-color: #666; /* Warna baris bergantian */
}

tr:hover {
  background-color: #777; /* Warna efek hover */
}

.completed {
  text-decoration: line-through;
  color: #bbb; /* Warna lebih terang untuk tugas yang selesai */
}

.checkbox {
  margin-right: 10px;
}

@media (max-width: 600px) {
  .add-task {
    flex-direction: column;
  }

  .task-input, .date-input, .add-button {
    width: 100%;
    margin: 5px 0;
  }

  th, td {
    font-size: 14px;
    padding: 10px;
  }
}

</style>
