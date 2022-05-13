<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    directionSignUp() {
      this.$router.push({ name: "SignUp" });
    },
    async login() {
      //-----------RegEx------------//

      let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "g");
      let emailTest = emailRegex.test(this.email);

      let mdpRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,100}$",
        "g"
      );
      let mdpTest = mdpRegex.test(this.password);

      function emailTestf() {
        if (!emailTest) {
          let msg = document.querySelector(".emailmsg");
          msg.classList.remove("cache");
        } else {
          let msg = document.querySelector(".emailmsg");
          msg.classList.add("cache");
          return true;
        }
      }
      emailTestf();

      function mdpTestf() {
        if (!mdpTest) {
          let msgPs = document.querySelector(".mdpmsg");
          msgPs.classList.remove("cache");
        } else {
          let msgPs = document.querySelector(".mdpmsg");
          msgPs.classList.add("cache");
          return true;
        }
      }
      mdpTestf();

      if (emailTestf() && mdpTestf()) {
        await fetch(`http://localhost:3000/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success connect:", data);
            localStorage.setItem("login-user", JSON.stringify(data));

            if (data.error) {
              const errorMdpEtEmail = data.error;
              //verif si email déjà dans db
              if (errorMdpEtEmail == "Le mot de passe est incorrect") {
                alert("Mot de passe est incorrect");
              }
              if (
                errorMdpEtEmail ==
                "utilisateur inexistant dans la base de donnée"
              ) {
                alert("Email introuvable");
              }
            } else {
              this.$router.push({ name: "All" });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
};
</script>

<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="container">
      <h1>Se connecter</h1>
      <hr />
      <label for="email"><b>Email</b></label>
      <p class="emailmsg cache">*email non valide</p>
      <input
        type="text"
        v-model="email"
        placeholder="Votre Email"
        name="email"
        id="email"
        required
      />

      <label for="psw"><b>Mot de passe</b></label>
      <p class="mdpmsg cache">*nom non valide</p>
      <input
        type="password"
        v-model="password"
        placeholder="Votre Mot de passe"
        name="psw"
        id="psw"
        required
      />
      <hr />

      <button type="submit" v-on:click="login" class="registerbtn">
        Se connecter
      </button>
    </div>

    <div class="container signin">
      <p>
        Tu n'as pas de compte?
        <a href="#" v-on:click="directionSignUp">S'inscrire</a>.
      </p>
    </div>
  </form>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

/* Add padding to containers */
.container {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.container ::placeholder {
  text-align: center;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
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
  background-color: #04aa6d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}

.cache {
  display: none;
}

.emailmsg,
.mdpmsg {
  font-size: 10px;
  font-style: italic;
  color: red;
}
</style>
