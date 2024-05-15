<template>
  <div id="app">
    <Navbar @navigate="currentSection = $event" />
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
