<template>
  <section></section>
</template>

<script>
export default {
  name: "CreateComments",
  data() {
    return {
      userId: "",
      admin: "",
      comments_messsage: "",
    };
  },
  methods: {
    async addComments(){


      await fetch(`http://localhost:3000/api/post/:id/comments`, {
          method: "POST",
          body: JSON.stringify({
            comments_messsage: this.comments_messsage,
        
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
    }
  },
  mounted() {
    const userLocalStorageToken = JSON.parse(
      localStorage.getItem("login-user")
    );
  },
};
</script>
