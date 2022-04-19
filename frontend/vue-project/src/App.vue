<script>

export default {
  name: 'App',
  methods : {
    directionHome(){
      this.$router.push({name:'Home'})
    }
  }
  
}
</script>

<template>
  <div> 
    <header v-on:click="directionHome">
      <img alt="Vue logo" class="logo" src="./assets/icon-left-font-monochrome-black (1).png"/>
    </header>

    <main>
      <router-view />
    </main>

  </div>
</template>

<style>
@import './assets/base.css';

header {
  background-color: #F0F6F6;
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
