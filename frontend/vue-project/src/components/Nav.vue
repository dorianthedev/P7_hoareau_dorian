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
      <router-link to="/all">Post</router-link>
      <router-link to="/profil">Profil</router-link>
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
  text-decoration: none;
  background-color: #ffd7d7;
  color: black;
  padding: 7px 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 50px;
  font-size: 12px ;
}



.block-nav {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

nav {
  display: flex;
  column-gap: 10px;
  
}
</style>
