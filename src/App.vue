<template>
  <div id="app">
    <Navbar @navigate="setCurrentSection">
      <!-- Slot untuk konten tambahan -->
      <template v-slot:custom-content>
        <button @click="handleButtonClick" class="custom-button">Klik Saya!</button>
      </template>
    </Navbar>
    <!-- Konten untuk komponen terpilih -->
    <component :is="currentSectionComponent" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Kegiatan from './components/kegiatan.vue';
import Posts from './components/Post.vue';

export default {
  components: {
    Navbar,
    Kegiatan,
    Posts
  },
  data() {
    return {
      currentSection: 'todos'
    };
  },
  computed: {
    currentSectionComponent() {
      return this.currentSection === 'todos' ? 'Kegiatan' : 'Posts';
    }
  },
  methods: {
    handleButtonClick() {
      alert(`Sedang berada di ${this.currentSection}`);
    },
    setCurrentSection(section) {
      this.currentSection = section;
    }
  }
};
</script>

<style>
.custom-button {
  background-color: white; /* Warna latar belakang putih */
  color: #333; /* Warna teks */
  border: 1px solid #333; /* Tepi hitam */
  padding: 5px 10px; /* Padding untuk mengatur ukuran tombol */
  border-radius: 4px; /* Mengatur sudut tombol */
  cursor: pointer;
}

.custom-button:hover {
  background-color: #f0f0f0; /* Warna latar belakang saat tombol dihover */
}
</style>
