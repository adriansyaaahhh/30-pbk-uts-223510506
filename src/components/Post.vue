<template>
    <div class="posts-container">
      <h2>Daftar Postingan</h2>
      <div class="user-select">
        <label for="user-select">Pilih User:</label>
        <select id="user-select" v-model="selectedUser" @change="fetchPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div v-if="posts.length" class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
      <div v-else>
        <p>Loading posts...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        posts: [],
        selectedUser: null
      };
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
        this.selectedUser = this.users[0].id;
        this.fetchPosts();
      },
      async fetchPosts() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = await response.json();
      }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .posts-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .user-select {
    margin-bottom: 20px;
  }
  
  .user-select label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .post-item {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #ffffff;
  }
  
  .post-item h3 {
    margin: 0 0 10px 0;
  }
  
  .post-item p {
    margin: 0;
    text-align: justify; /* This will justify the text in the paragraph */
  }
  </style>
  