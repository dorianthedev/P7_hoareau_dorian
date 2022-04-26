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
      userId:'',
      admin:'',
      posts: [],
    };
  },
  methods: {
    
  },
  async mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );
    
    this.userId = userLocalStorageToken.id
    this.admin = userLocalStorageToken.admin
    
    

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
          <div class="block-post__user">
            <p>{{ post.firstName }} {{ post.lastName }}</p>
          </div>
          <div class="block-post__title">
            <p>{{ post.post_title }}</p>
          </div>
          <div class="block-post__message">
            <p>{{ post.post_message }}</p>
          </div>
          <div class="block-post__image">
            <img
              class="image"
              v-if="post.post_image"
              :src="post.post_image"
              alt="photo du profil de l'utilisatuer qui a écris la publication"
            />
          </div>
          <div class="bandeaubtn" v-if="post.post_userId == userId || this.admin == 1 || this.admin == true">
            <button v-if="post.userId == userId" class="modify">
              <p>Modifier</p>
            </button>
            <button class="delete" @click="deleteAPost(post.id)">
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
}

h3 {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}
.image {
  width: 300px;
  height: 300px;
}

</style>
