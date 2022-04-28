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
      <div class="block-profil">
        <div class="block-profil-data">
          <div class="block-profil-img">
            <img
              class="img-user"
              src="../assets/User_icon_BLACK-01.png"
              alt=""
            />
          </div>
          <div class="block-profil-name">
            <p class="block-profil-f-l">
              {{ user.firstName }} {{ user.lastName }}
            </p>
          </div>
        </div>
        <div class="block-button">
          <button class="button-messages">
            <p>Envoyer un message</p>
          </button>
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

.block-profil {
  border: 1px solid black;
  display: flex;
  max-width: 300px;
  margin: 0 auto;
  border: 2px solid black;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 10px;
  
}

.block-profil-data {
  display: flex;
  align-items: center;
}

.img-user {
  width: 30px;
}

.block-button {
  margin-left: auto;
  padding-right: 10px;
}
.block-button {
  margin-left: auto;
  padding-right: 10px;
}

.admin-user {
  font-size: 10px;
}
.button-messages {
  background-color: #b1f2ff;
  color: black;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  opacity: 0.9;
  font-weight: bold;
  border-radius: 50px;
}

.button-messages p {
  font-size: 11px;
}
</style>
