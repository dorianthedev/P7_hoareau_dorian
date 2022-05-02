<script>
export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      admin: false,
    };
  },
  methods: {
    async signup() {
      

      //-----------RegEx------------//

      let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "g");
      let emailTest = emailRegex.test(this.email);

      let prenomRegex = new RegExp(
        /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,50})$/,
        "g"
      );
      let prenomTest = prenomRegex.test(this.firstName);

      let nomRegex = new RegExp(
        /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,50})$/,
        "g"
      );
      let nomTest = nomRegex.test(this.lastName);

      let mdpRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,100}$",
        "g"
      );
      let mdpTest = mdpRegex.test(this.password);

      //----------- FUNCTION RegEx------------//

      function prenomTestf() {
        if (!prenomTest) {
          let msgP = document.querySelector(".prenommsg");
          msgP.classList.remove("cache");
        } else {
          let msgP = document.querySelector(".prenommsg");
          msgP.classList.add("cache");
          return true;
        }
      }
      prenomTestf();

      function nomTestf() {
        if (!nomTest) {
          let msgN = document.querySelector(".nommsg");
          msgN.classList.remove("cache");
        } else {
          let msgN = document.querySelector(".nommsg");
          msgN.classList.add("cache");
          return true;
        }
      }
      nomTestf();

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

      if (prenomTestf() && nomTestf() && emailTestf() && mdpTestf()) {
        await fetch(`http://localhost:3000/api/auth/signup`, {
          method: "POST",
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            admin: this.admin,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);

            if (data.error) {
              const errorEmail = data.error.code;
              //verif si email déjà dans db
              if (errorEmail == "ER_DUP_ENTRY") {
                alert("Adresse email déjà utilisé");
              }
            } else {
              this.$router.push({ name: "Login" });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    directionLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="container">
      <h1>Créer un compte</h1>
      <hr />
      <label for="fName"><b>Prénom</b></label>
      <p class="prenommsg cache">*prénom non valide</p>
      <input
        type="text"
        v-model="firstName"
        placeholder="Votre Prénom"
        name="fName"
        id="fName"
        required
      />

      <label for="lName"><b>Nom</b></label>
      <p class="nommsg cache">*nom non valide</p>
      <input
        type="text"
        v-model="lastName"
        placeholder="Votre Nom"
        name="lName"
        id="lName"
        required
      />

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

      

      <button type="submit" v-on:click="signup" class="registerbtn">
        Créer mon compte
      </button>
    </div>

    <div class="container signin">
      <p>
        Tu as déjà un compte?
        <a href="#" v-on:click="directionLogin">Se connecter</a>.
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
.prenommsg,
.nommsg,
.mdpmsg {
  font-size: 10px;
  font-style: italic;
  color: red;
}
</style>
