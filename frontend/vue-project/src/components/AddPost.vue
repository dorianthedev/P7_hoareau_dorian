<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        title: "",
        message: "",
        image: null,
        // post_userId:"",
      },
    };
  },
  mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );

  },
  methods: {
    //recuperer les data de l'image
    recupImage(e) {
      this.post.image = e.target.files[0];
    },

    async addPost() {
      const userLocalStorageToken = JSON.parse(
        localStorage.getItem("login-user")
      );

      // formData.append("userId", this.post.post_userId);

      if (this.post.title !== "" && this.post.message !== "") {
        if (this.post.image !== null) {
          // methode FormData
          const post = new FormData();
          post.append("post_title", this.post.title);
          post.append("post_message", this.post.message);
          post.append("image", this.post.image);

          //fetch post
          //* Créer un post
          await fetch(`http://localhost:3000/api/post/`, {
            method: "POST",
            body: post,
            headers: {
              Authorization: `Bearer ${userLocalStorageToken.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              this.$emit("addPost", data.results[0]);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          // methode FormData
          const postSansimage = new FormData();
          postSansimage.append("post_title", this.post.title);
          postSansimage.append("post_message", this.post.message);

          //fetch
          await fetch(`http://localhost:3000/api/post/`, {
            method: "POST",
            body: postSansimage,
            headers: {
              Authorization: `Bearer ${userLocalStorageToken.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              this.$emit("addPost", data.results[0]);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
    },
  },
};
</script>

<template>
  <section>
    <form v-on:submit.prevent="onSubmit">
      <div class="container">
        <label for="message"><h3>Mon Post</h3></label>
        <input
          type="text"
          aria-label="Titre du post"
          v-model="post.title"
          placeholder="Titre important"
          name="title"
          id="title"
          required
        />
        <input
          type="text"
          aria-label="Contenu du post"
          v-model="post.message"
          placeholder="Votre message"
          name="message"
          id="message"
          required
        />
        <input
          type="file"
          aria-label="Ajoute une image"
          v-on:change="recupImage"
          id="addFile"
          name="addFile"
          accept="image/png, image/jpeg, image/jpg"
        />
        <button type="submit" v-on:click="addPost" class="registerbtn">
          Je poste
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
/* Add padding to containers */
h3 {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  border-radius: 30px;
}

.container ::placeholder {
  text-align: center;
}

/* Full-width input fields */
input[type="text"] {
  width: 90%;
  padding: 15px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  border-radius: 25px;
}

input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}

input[id="title"] {
  width: 65%;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
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

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

.separe2 {
  height: 10px;
  background-color: black;
}
</style>
