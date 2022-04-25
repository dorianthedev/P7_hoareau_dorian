<script>
export default {
  name: "All",
  data() {
    return {
      posts: []
    };
  },
  methods: {},
  async mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );

    if (!userLocalStorageToken) return this.$router.push({ name: "Login" });

    await fetch(`http://localhost:3000/api/post`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userLocalStorageToken.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.message == "Echec d'authentification") {
            this.$router.push({name:'Login'});
        }
        this.posts = data.results
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
      <h1>Bienvenue</h1>
    </div>
  </section>
</template>

<style scoped></style>
