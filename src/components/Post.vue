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
  props: {
    selectedUserProp: Number,
    postsProp: Array
  },
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
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.user-select {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-select label {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}

.user-select select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
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
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.post-item:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.post-item h3 {
  margin: 0 0 10px 0;
  color: #007bff;
  font-size: 20px;
}

.post-item p {
  margin: 0;
  color: #333;
  line-height: 1.6;
  text-align: justify;
}

.post-item p::first-letter {
  font-size: 1.2em;
  font-weight: bold;
  color: #000;
}

@media (max-width: 600px) {
  .posts-container {
    padding: 10px;
  }

  .post-item {
    padding: 15px;
  }

  .post-item h3 {
    font-size: 18px;
  }
}
</style>
