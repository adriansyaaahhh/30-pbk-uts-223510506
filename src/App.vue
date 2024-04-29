<template>
  <div id="app">
      <Navbar />
      <kegiatan />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import kegiatan from './components/kegiatan.vue';


export default {
  components: {
      Navbar,
      kegiatan
  }
};
</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
