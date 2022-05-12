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
      commentaires: "",
      commentsMessage: "",
    };
  },
  methods: {
    addPost(post) {
      this.posts.unshift(post);
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
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("delete", data);
          if ((data.message = "OK SUPPRIMER dnas la base de données")) {
            alert("La publication a bien été supprimée.");
            window.location = "/all";
          } else {
            alert("vous n'êtes pas autorisé à supprimer le post");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async postComments(post) {
      const userLocalStorageToken = JSON.parse(
        localStorage.getItem("login-user")
      );

      // console.log(this.commentsMessage);

      await fetch(`http://localhost:3000/api/post/${post.id_post}/comments`, {
        method: "POST",
        body: JSON.stringify({
          comments_messsage: post.comment,
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userLocalStorageToken.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          window.location = "/all";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    deleteAComments(commentsId) {
      const userLocalStorageToken = JSON.parse(
        localStorage.getItem("login-user")
      );
      fetch(`http://localhost:3000/api/post/${commentsId}/comments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLocalStorageToken.token}`,
        },
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("delete", data);
          if (
            (data.message = "OK SUPPRIMER commentaires dans la base de données")
          ) {
            alert("Le commentaire a bien été supprimée.");
            window.location = "/all";
          } else {
            alert("vous n'êtes pas autorisé à supprimer le commentaires");
            window.location = "/all";
          }
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //afficher les comm
    // afficher les posts sans les commentaires
    await fetch(`http://localhost:3000/api/post/comments`, {
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
        this.commentaires = data.results;
        // if (this.commentaires.length < 1) {
        //   console.log("aucun com");
        // }
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
      <!-- NAVBAR -->
      <Nav />
      <!-- NAVBAR -->
      <!-- ADDPOST -->
      <AddPost @addPost="addPost" />
      <!-- ADDPOST -->
      <!-- AFFICHER LE POST -->
      <h3 v-if="this.posts.length >= 1" class="tilte-post-collegue">
        Les posts des collègues
      </h3>
      <h3 v-else-if="this.posts.length < 1" class="tilte-post-collegue">
        O post à afficher
      </h3>

      <div class="main-block" v-for="post in posts" :key="post.id_post">
        <div class="block-post">
          <div class="block-post__user-and-create">
            <div class="block-post__create">
              <p>Créer le {{ post.post_date }}</p>
            </div>
            <div class="block-post__user">
              <p>
                <span
                  ><img
                    class="img-user"
                    src="../assets/User_icon_BLACK-01.png"
                    alt=""
                /></span>
                {{ post.firstName }} {{ post.lastName }}
              </p>
            </div>
          </div>
          <div class="block-post__title">
            <p>{{ post.post_title }}</p>
          </div>
          <div class="block-post__message">
            <p>{{ post.post_message }}</p>
          </div>
          <div class="block-post__image" v-if="post.post_image !== null">
            <img class="image" :src="post.post_image" alt="photo" />
          </div>
          <div
            class="bandeaubtn"
            v-if="post.id == userId || this.admin == 1 || this.admin == true"
          >
            <button class="delete" @click="deleteAPost(post.id_post)">
              <p>Supprimer</p>
            </button>
          </div>
          <!--Créer un COMMENTAIRES -->
          <section class="main-block-create-comments">
            <form v-on:submit.prevent="onSubmit">
              <div class="container">
                <label for="comments"></label>
                <input
                  type="text"
                  v-model="post.comment"
                  placeholder="Votre commentaire"
                  name="comments"
                  id="comments"
                />
                <button
                  type="submit"
                  @click="postComments(post)"
                  class="btn-post-comments"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </section>

          <!-- Fin Créer un COMMENTAIRES -->
          <!-- Afficher LES COMMENTAIRES -->
        <section class="main-block-comments">
          <div class="block-title-comments">
            <h5>Les commentaires</h5>
            <!-- <p>Afficher les commentaires &#9660;</p> -->
          </div>
          <div
            v-for="commentaire in commentaires"
            :key="commentaire.comments_postId"
          >
            <div
              class="main-block-user-comments"
              v-if="commentaire.comments_postId == post.id_post"
            >
              <div class="block-user-comments">
                <p>{{ commentaire.firstName }} {{ commentaire.lastName }}</p>
              </div>
              <div class="block-message-comments">
                <p>{{ commentaire.comments_messsage }}</p>
              </div>
              <div
                class="bandeaubtn"
                v-if="
                  commentaire.comments_userId == userId ||
                  this.admin == 1 ||
                  this.admin == true
                "
              >
                <button
                  class="deleteComments"
                  @click="deleteAComments(commentaire.id_comments)"
                >
                  <p>Supprimer</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <!-- FIN Afficher LES COMMENTAIRES -->
        </div>

        
      </div>
      <!-- Fin AFFICHER LE POST -->
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
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding: 0px 10px;
}

.block-post {
  height: auto;
  border-radius: 25px;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
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
  width: inherit;
  height: auto;
}

.image {
  width: inherit;
  height: auto;
  object-fit: cover;
  border-radius: 25px;
}

.block-post__message {
  background-color: white;
  padding: 4px 8px;
  border-radius: 25px;
  margin-bottom: 15px;
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

/* image user */
.img-user {
  width: 18px;
  background-color: white;
  border-radius: 25px;
}

.block-post__title p {
  font-weight: 600;
  font-size: 25px;
}

/* Les commentaires*/

.cache {
  display: flex;
}

.main-block-comments {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid black;
  width: 100%;
  max-width: 580px;
  border-radius: 25px;
  margin-bottom: 20px;
}

h5 {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.block-title-comments p {
  text-align: center;
  font-style: italic;
  font-size: 14px;
  text-decoration: underline;
}

.main-block-user-comments {
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 10px;
  background-color: white;
  text-align: center;
}

.block-user-comments p {
  font-weight: bold;
  font-size: 12px;
  color: rgb(3, 173, 173);
}

/* CREER Les commentaires*/

.main-block-create-comments {
  max-width: 580px;
  width: 100%;
  text-align: center;
}

.main-block-create-comments input[type="text"] {
  padding: 15px;
  margin: 5px 0px 10px 0px;
  display: inline-block;
  border: none;
  background: white;
  border-radius: 25px;
}




.main-block-create-comments input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}
.btn-post-comments {
  background-color: #ffd7d7;
  color: black;
  padding: 10px 17px;
  margin: 3px 0px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  font-weight: bold;
  border-radius: 50px;
}

.bandeaubtn .deleteComments {
  background-color: rgb(186, 0, 0);
  font-size: 12px;
  padding: 5px 5px;
  margin: 0px 0px 5px 0;
}
</style>
