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
      <router-link to="/all">Post |</router-link>
      <router-link to="/profil">Profil |</router-link>
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

a, router-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: red;
}

.block-nav {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  
    background-color: #F0F6F6;

}

nav {
  display: flex;
  column-gap: 10px;
  
}
</style>
