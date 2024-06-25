<template>
    <div v-if="photo" class="photo-detail-container">
      <h2>{{ photo.title }}</h2>
      <img :src="photo.url" :alt="photo.title" class="photo-detail-image" />
      <p>ID: {{ photo.id }}</p>
      <p>Album ID: {{ photo.albumId }}</p>
      <router-link to="/photos" class="back-button">Kembali ke Daftar Foto</router-link>
    </div>
    <div v-else>Loading...</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        photo: null
      };
    },
    async created() {
      const photoId = this.$route.params.id;
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
      this.photo = await response.json();
    }
  };
  </script>
  
  <style scoped>
  .photo-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .photo-detail-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .back-button {
    background-color: #ddbc95;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
  }
  
  .back-button:hover {
    background-color: #b38877;
  }
  </style>
  