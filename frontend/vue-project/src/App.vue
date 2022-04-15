<script>
import SignUp from './components/SignUp.vue';

export default {
  name: 'App',
  components: {
    SignUp
  }
}
</script>

<template>
  <div> 
    <header>
      <img alt="Vue logo" class="logo" src="./assets/icon-left-font-monochrome-black (1).png"/>

    </header>

    <main>
      <SignUp />
    </main>

  </div>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

.logo {
  display: block;
  width: 250px;
  margin: 0 auto;
  text-align: center;
}

@media screen and (max-width: 450px) {
  .logo {
    width: 200px;
  }
}


</style>
