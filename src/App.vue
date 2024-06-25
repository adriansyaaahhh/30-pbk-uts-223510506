<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header-purple">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>
          Aplikasi Saya
        </q-toolbar-title>
        <q-btn flat round dense icon="menu" @click="rightDrawerOpen = !rightDrawerOpen" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="drawer-purple">
      <q-list>
        <router-link to="/todos" class="drawer-item">
          <q-item clickable v-ripple>
            <q-item-section class="drawer-item-section">Todos</q-item-section>
          </q-item>
        </router-link>
        <router-link to="/posts" class="drawer-item">
          <q-item clickable v-ripple>
            <q-item-section class="drawer-item-section">Posts</q-item-section>
          </q-item>
        </router-link>
        <router-link to="/photos" class="drawer-item">
          <q-item clickable v-ripple>
            <q-item-section class="drawer-item-section">Photos</q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered class="drawer-purple">
      <q-list>
        <q-item class="drawer-item">
          <q-item-section class="drawer-item-section">Konten Kustom</q-item-section>
        </q-item>
        <q-item class="drawer-item">
          <q-item-section class="drawer-item-section">
            <button @click="handleButtonClick" class="custom-button">Klik Saya!</button>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="main-content">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const handleButtonClick = () => {
      alert('Kustom button clicked!');
    };

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      handleButtonClick
    };
  }
};
</script>

<style>
.main-content {
  background-color: #626d71; /* Warna latar belakang */
  padding: 20px;
  min-height: 100vh; /* Menambahkan ini untuk memastikan latar belakang mencakup seluruh tinggi halaman */
}

.custom-button {
  background-color: white; 
  color: #333; 
  border: 1px solid #333; 
  padding: 5px 10px; 
  border-radius: 4px; 
  cursor: pointer;
}

.custom-button:hover {
  background-color: #f0f0f0; 
}

/* Menambahkan gaya untuk drawer kiri dan kanan */
.drawer-purple {
  background-color: #cdcdc0; /* Warna ungu */
}

/* Menambahkan gaya untuk teks drawer */
.drawer-item-section {
  color: rgb(0, 0, 0) !important; /* Warna teks putih */
}

/* Menambahkan gaya untuk header */
.header-purple {
  background-color: #cdcdc0; /* Warna ungu */
  color: rgb(0, 0, 0); /* Warna teks putih agar terlihat kontras */
}
</style>
