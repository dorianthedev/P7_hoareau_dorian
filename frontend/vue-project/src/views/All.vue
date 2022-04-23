<script>
export default {
    name:'All',
    methods: {

    },
    async mounted() {
            const userLocalStorageToken = JSON.parse(localStorage.getItem("login-user"));
            // const userLocalStorage = localStorage.getItem("login-user");
            // if (!userLocalStorage) {
            //     this.$router.push({name:'Login'});
            // }
            
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
                    if (userLocalStorageToken.token !== data.token) {
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