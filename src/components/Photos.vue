<template>
    <div class="photos-container">
      <h2>Daftar Foto</h2>
      <div class="search-container">
        <label for="photo-search">Cari Foto berdasarkan ID:</label>
        <input type="text" id="photo-search" v-model="searchText" @input="filterPhotos" placeholder="Masukkan ID foto">
      </div>
      <div v-if="loading">Loading photos...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="photos-list">
        <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
          <div class="photo-wrapper">
            <img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail" />
            <div class="photo-label">{{ photo.id }}</div> <!-- Label dengan ID foto -->
          </div>
          <p>{{ photo.title }}</p>
          <router-link :to="`/photos/${photo.id}`" class="view-button">Lihat Foto</router-link>
        </div>
      </div>
      <div v-if="fullSizeImage">
        <div class="full-size-image-overlay" @click="hideFullSize"></div>
        <div class="full-size-image-container">
          <img :src="fullSizeImage.url" :alt="fullSizeImage.title" class="full-size-image"/>
          <p>{{ fullSizeImage.title }}</p>
          <button @click="hideFullSize" class="back-button">Kembali</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        photos: [],
        loading: false,
        error: null,
        fullSizeImage: null,
        searchText: '',
        originalPhotos: [],
      };
    },
    computed: {
      filteredPhotos() {
        if (!this.searchText.trim()) {
          return this.photos;
        } else {
          return this.photos.filter(photo => photo.id.toString().includes(this.searchText.trim()));
        }
      }
    },
    methods: {
      async fetchPhotos() {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/photos');
          if (!response.ok) {
            throw new Error('Gagal mengambil data foto');
          }
          this.photos = await response.json();
          this.originalPhotos = [...this.photos]; // Inisialisasi dataset asli sebelum filtering
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
      filterPhotos() {
        this.photos = this.originalPhotos; // Mengembalikan ke dataset asli sebelum filtering
        if (!this.searchText.trim()) {
          return;
        } else {
          const searchId = parseInt(this.searchText.trim());
          this.photos = this.photos.filter(photo => photo.id === searchId);
        }
      }
    },
    mounted() {
      this.fetchPhotos();
    }
  };
  </script>
  
  <style scoped>
  .photos-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .album-select {
    margin-bottom: 20px;
  }
  
  .album-select label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  .search-container label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  .search-container input {
    padding: 5px;
  }
  
  .photos-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .photo-item {
    width: 150px;
    text-align: center;
    position: relative; 
  }
  
  .photo-thumbnail {
    width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .photo-item p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  
  .view-button {
    background-color: #ddbc95;
    color: #fff;
    border: none;
    padding: 5px 5px; 
    margin-bottom: 10px;
    border-radius: 2px;
    cursor: pointer;
    position: absolute;
    bottom: -25px; /* Geser ke bawah untuk memberi ruang bagi teks */
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  
  .view-button:hover {
    background-color: #b38877;
  }
  
  .full-size-image-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .full-size-image-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    text-align: center;
  }
  
  .full-size-image {
    max-width: 80%;
    max-height: 80%;
  }
  
  .full-size-image-container p {
    color: #fff;
    margin-top: 10px;
  }
  
  .back-button {
    background-color: #ddbc95;
    color: #fff;
    border: none;
    padding: 5px 5px;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
  
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  
  .back-button:hover {
    background-color: #b38877;
  }
  
  .photo-wrapper {
    position: relative;
  }
  
  .photo-label {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 12px;
  }
  </style>
  