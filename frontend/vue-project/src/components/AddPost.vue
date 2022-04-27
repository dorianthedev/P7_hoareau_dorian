<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        title: "",
        message: "",
        image: "",
      },
    };
  },
  methods: {
    recupImage(e) {
      console.log(e);
      this.post.image = e.target.files[0].name;
    },
    async addPost() {
      const userLocalStorageToken = JSON.parse(
        localStorage.getItem("login-user")
      );
      const post = {
        post_title: this.post.title,
        post_message: this.post.message,
        post_image: this.post.image,
      };
      const postString = JSON.stringify(post);

      console.log(postString);
      await fetch(`http://localhost:3000/api/post/`, {
        method: "POST",
        body: postString,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userLocalStorageToken.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<template>
  <section>
    <form v-on:submit.prevent="onSubmit">
      <div class="container">
        <label for="message"><h3>Ecrire un post</h3></label>
        <input
          type="text"
          v-model="post.title"
          placeholder="Titre important"
          name="title"
          id="title"
          required
        />
        <input
          type="text"
          v-model="post.message"
          placeholder="Votre message"
          name="message"
          id="message"
          required
        />
        <input
          type="file"
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
  border: 3px solid black;
}

.container ::placeholder {
  text-align: center;
}

/* Full-width input fields */
input[type="text"] {
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
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
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 40%;
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
</style>
