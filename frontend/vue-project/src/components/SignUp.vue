<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data()
    {
      return {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        admin:''
      }
    },
    methods: {
      async signup() {
        
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          admin: this.admin
        }
        const radioAdmin = document.querySelector('#admin');

        if (radioAdmin.checked == true) {
          user.admin = 1;
        } else {
          user.admin = 0;
        }

        // let result = await axios.post("http://localhost:3000/api/auth/signup", {
        //   firstName: this.firstName,
        //   lastName: this.lastName,
        //   email: this.email,
        //   password: this.password,
        //   admin: this.admin
        // });

        // console.log(result);


        await fetch(`http://localhost:3000/api/auth/signup`, {
                method: "POST",
                body: JSON.stringify({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  email: this.email,
                  password: this.password,
                  admin: this.admin
                }),
                headers: {
                    "Content-type" : "application/json"
                },
            })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        }); 
        
      }
    }
}
</script>

<template>
    <form v-on:submit.prevent="onSubmit">
        <div class="container">
            <h1>Créer un compte</h1>
            <hr>
            <label for="fName"><b>Prénom</b></label>
            <input type="text" v-model="firstName" placeholder="Votre Prénom" name="fName" id="fName">

            <label for="lName"><b>Nom</b></label>
            <input type="text" v-model="lastName" placeholder="Votre Nom" name="lName" id="lName">

            <label for="email"><b>Email</b></label>
            <input type="text" v-model="email" placeholder="Votre Email" name="email" id="email">

            <label for="psw"><b>Mot de passe</b></label>
            <input type="password" v-model="password" placeholder="Votre Mot de passe" name="psw" id="psw">

            <input type="checkbox" v-model="admin" id="admin" name="admin">
            <label for="admin">Admin ou non ?</label>
            <hr>

            <button type="submit" v-on:click="signup" class="registerbtn">Créer mon compte</button>
        </div>

        <div class="container signin">
            <p>Tu as déjà un compte? <a href="#">Se connecter</a>.</p>
        </div>
    </form>
</template>

<style>
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
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
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
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity:1;
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
</style>