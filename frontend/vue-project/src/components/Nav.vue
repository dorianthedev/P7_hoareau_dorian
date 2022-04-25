<script>
export default {
  name: "Nav",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<template>
  <section class="block-nav">
    <nav>
      <a href="">Post</a>
      <a href="">Profile</a>
      <a v-on:click="logout" href="">Déconnexion</a>
    </nav>
  </section>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

a {
  color: black;
}

a:hover {
  color: red;
}

.block-nav {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

nav {
  display: flex;
  column-gap: 10px;
}
</style>
