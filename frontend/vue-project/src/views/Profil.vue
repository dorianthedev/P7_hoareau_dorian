<script>
import Nav from "../components/Nav.vue";
import AllUsers from "../components/AllUsers.vue";
export default {
  name: "Profil",
  data() {
    return {
      user: [],
    };
  },
  components: {
    Nav,
    AllUsers,
  },
  methods: {
    deleteProfil() {
      const userLocalStorageToken = JSON.parse(
        localStorage.getItem("login-user")
      );
      const postId = userLocalStorageToken.userId;

      fetch(`http://localhost:3000/api/auth/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLocalStorageToken.token}`,
        },
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("delete", data);
          alert("La profil a bien été supprimée.");
          localStorage.clear();
          this.$router.push({ name: "SignUp" });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  async mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );
    const idLocal = userLocalStorageToken.userId;
    if (!userLocalStorageToken) return this.$router.push({ name: "Login" });

    await fetch(`http://localhost:3000/api/auth/${idLocal}/profil`, {
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
        this.user = data.results[0];
        console.log(this.user);
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
      <h3 class="monprofil">Mon profil</h3>
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
              {{ this.user.firstName }} {{ this.user.lastName }}
              <span class="admin-user" v-if="this.user.admin == 1"
                >(admin)</span
              >
            </p>
          </div>
        </div>
        <div class="block-button">
          <button class="button-delete" @click="deleteProfil()">
            <p>Supprimer</p>
          </button>
        </div>
      </div>
      <h3 class="title-equipe">L'équipe de travail</h3>
    </div>
    <div>
      <AllUsers />
    </div>
  </section>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

h3 {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}

.title-equipe {
  font-size: 25px;
  margin: 20px 0;
}

.block-profil {
  border: 1px solid black;
  display: flex;
  max-width: 300px;
  margin: 0 auto;
  border: 2px solid black;
  align-items: center;
  border-radius: 20px;
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

.admin-user {
  font-size: 10px;
}
.button-delete {
  background-color: #ffd7d7;
  color: black;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  opacity: 0.9;
  font-weight: bold;
  border-radius: 50px;
}
</style>
