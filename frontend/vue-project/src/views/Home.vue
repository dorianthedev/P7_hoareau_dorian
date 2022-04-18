<template>
    <section class="main-bg">
        <div class="main-video__block-all">
            <div class="main-video__block-bg">
                <img class="main-bg__4k" src="../assets/bgHome.jpg" alt="">
            </div>
            <div class="main-video__block-text-all">
                    <div class="main-video__block-text">
                        <h1>Bienvenue</h1>
                    </div>
                    <div class="block-button">
                        <button class="main-video__block-button button1">
                            <h3 v-on:click="directionSignUp" class="main-video__button-text">S'inscrire</h3><span><i class="fas fa-angle-double-right"></i></span>
                        </button>
                        <button class="main-video__block-button button2">
                            <h3 v-on:click="directionLogin" class="main-video__button-text">Connexion</h3><span><i class="fas fa-angle-double-right"></i></span>
                        </button>
                    </div>
                    
            </div>
        </div>
    </section>
    
</template>

<script>
export default {
    name: 'Home',
    methods: {
        directionSignUp(){
            this.$router.push({name:'SignUp'})
        },
        directionLogin(){
            this.$router.push({name:'Login'})
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 35px;
    font-weight: bold;
}
button {
    border: 1px solid black;
    padding: 5px;
    border-radius: 50px;
}

.main-bg {
    width: 100%;
    height: 100vh;
    position: relative;
}
.main-video__block-all {
  width: 100%;
  height: 100vh;
}

.main-video__block-bg {
    width: 100%;
    height: 100vh;
}

.main-bg__4k {
    width: 100%;
    height: inherit;
    -o-object-fit: cover;
        object-fit: cover;
}

.main-video__block-text-all {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    z-index: 3;
    min-width: 260px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    row-gap: 30px;
}

.block-button {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    column-gap: 10px;
}


</style>