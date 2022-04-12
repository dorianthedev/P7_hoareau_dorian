<script>
export default {
    name: 'SignUp'
}
</script>

<template>
    <form action="">
        <div class="container">
            <h1>Créer un compte</h1>
            <hr>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Votre Email" name="email" id="email" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Votre Mot de passe" name="psw" id="psw" required>
            <hr>

            <button type="submit" class="registerbtn">Créer mon compte</button>
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