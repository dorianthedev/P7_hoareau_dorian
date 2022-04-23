<script>
export default {
    name:'All',
    data()
    {
        return {
            userId:'',
            admin:'',
            token:'',
            allposts:[],
            allusers:[]
        }
    },
    methods: {

    },
    async mounted() {
            const userLocalStorageToken = JSON.parse(localStorage.getItem("login-user"));
            
            if (userLocalStorageToken) {
                await fetch(`http://localhost:3000/api/post`, {
                      
                      headers: {
                          "Content-type" : "application/json",
                          'Authorization': `Bearer ${userLocalStorageToken.token}`
                      },
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (userLocalStorageToken.token !== data.token || data.message == "Echec d'authentification") {
                        this.$router.push({name:'Login'});
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                }); 
                
            } else {
                this.$router.push({name:'Login'});
            }
    }
}
</script>

<template>
    <section>
        <div>
            <h1>Bienvenue</h1>
        </div>
    </section>
</template>

<style scoped>

</style>