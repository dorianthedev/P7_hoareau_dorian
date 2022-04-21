<script>
export default {
    name:'All',
    methods: {

    },
    mounted() {
            const userLocalStorage = localStorage.getItem("login-user");
            if (!userLocalStorage) {
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