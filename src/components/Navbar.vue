<template>
  <nav class="navbar">
    <div class="nav-brand">MENU</div>
    <ul class="nav-links">
      <li><router-link to="/todos">TODOS</router-link></li>
      <li><router-link to="/posts">POST</router-link></li>
      <li><router-link to="/photos">PHOTOS</router-link></li>
    </ul>
    <slot name="custom-content"></slot>
  </nav>
</template>

<script>

</script>


<style scoped>
.navbar {
  background-color: #31363F;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ecf0f1;
}
.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #ecf0f1;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
