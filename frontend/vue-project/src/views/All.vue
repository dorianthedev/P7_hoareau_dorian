<script>
import Nav from "../components/Nav.vue";
import AddPost from "../components/AddPost.vue";
export default {
  name: "All",
  components: {
    Nav,
    AddPost,
  },
  data() {
    return {
      userId: "",
      admin: "",
      posts: [],
    };
  },
  methods: {
    addPost(post){
      this.post.unshift(post)
    },
    deleteAPost(postId) {
      const userLocalStorageToken = JSON.parse(
        localStorage.getItem("login-user")
      );
      fetch(`http://localhost:3000/api/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLocalStorageToken.token}`,
        },
        method: "DELETE",
      }).then(() => {
        alert("La publication a bien été supprimée.");
        window.location = "/all";
      });
    },
  },
  async mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );

    if (!userLocalStorageToken) return this.$router.push({ name: "Login" });

    this.userId = userLocalStorageToken.userId;
    this.admin = userLocalStorageToken.admin;

    // afficher les posts sans les commentaires
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
      <AddPost />
      <h3>Les posts des collègues</h3>
      <div class="main-block" v-for="post in posts" :key="post.id_post">
        <div class="block-post">
          <div class="block-post__user-and-create">
            <div class="block-post__create">
              <p>Créer le {{ post.post_date }}</p>
            </div>
            <div class="block-post__user">
              <p>De: {{ post.firstName }} {{ post.lastName }}</p>
            </div>
            
          </div>
          <div class="block-post__title">
            <p>Titre: {{ post.post_title }}</p>
          </div>
          <div class="block-post__message">
            <p>Message: {{ post.post_message }}</p>
          </div>
          <div class="block-post__image" v-if="post.post_image !== null">
            <img
              class="image"
              
              :src="post.post_image"
              alt="photo"
            />
          </div>
          <div
            class="bandeaubtn"
            v-if="post.id == userId || this.admin == 1 || this.admin == true"
          >
            <button class="modify">
              <p>Modifier</p>
            </button>
            <button class="delete" @click="deleteAPost(post.id_post)">
              <p>Supprimer</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

.main-block {
  display: flex;
  justify-content: center;
  
}

.block-post {
  margin-bottom: 20px;
  height: auto;
  border-radius: 25px;
  width:100%;
  max-width: 600px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.10);
}



.block-post__create {
  font-size: 10px;
}


h3 {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}
.block-post__image {
  width: inherit ;
  height: 200px;
}

.image {
  width: inherit;
  height: 200px;
  object-fit: cover;
  border-radius: 25px;
}

.bandeaubtn {
  display: flex;
  justify-content: center;
  column-gap: 10px;
  text-align: center;
  margin-top: 5px;
}

.bandeaubtn button {
  background-color: black;
  color: black;
  padding: 10px 10px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  color: white;
  font-weight: bold;
  border-radius: 50px;
}
</style>
