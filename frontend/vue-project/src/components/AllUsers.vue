<script>
export default {
  name: "AllUsers",
  data() {
    return {
      users: [],
    };
  },

  methods: {},
  async mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );
    if (!userLocalStorageToken) return this.$router.push({ name: "Login" });

    const idLocal = userLocalStorageToken.userId;

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
          this.$router.push({ name: "SignUp" });
        }
        this.users = data.results;
        console.log(this.users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>

<template>
  <div class="main-content">
    <div v-for="user in users" :key="user.id">
      <div class="block-profile-users">
        <div class="block-profile-img">
          <img
            class="profile-img"
            src="../assets/User_icon_BLACK-01.png"
            alt=""
          />
        </div>
        <div class="block-profile-name">
          <p>{{ user.firstName }} {{ user.lastName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

.block-profile-users {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 180px;
  margin: 0 auto 15px;
  border: 2px solid black;
  align-items: center;
  border-radius: 50%;
  
}

.profile-img {
  width: 100px;
}
</style>
