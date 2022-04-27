<script>
import Nav from "../components/Nav.vue";
export default {
  name: "Profil",
  components: {
    Nav,
  },
  async mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );
    const idLocal = userLocalStorageToken.userId;
    if (!userLocalStorageToken) return this.$router.push({ name: "Login" });

    await fetch(`http://localhost:3000/api/auth/${idLocal}/allusers`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userLocalStorageToken.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.message == "Echec d'authentification") {
          this.$router.push({ name: "Login" });
        }
        this.posts = data.results;
        console.log(this.posts);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  },
};
</script>

<template>
  <section>
    <div>
      <Nav />
      <h1>b</h1>
    </div>
  </section>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}
</style>
