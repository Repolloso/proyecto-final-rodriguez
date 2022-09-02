<template lang="html">
  <section class="nav-bar-view">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid"> 
        <a class="navbar-brand">Vue Proyect <img src="../assets/logo.png" alt="" width="10%"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/home">Home</a>
            </li>
            <li class="nav-item" v-if="user.isAdmin == true">
              <a class="nav-link" aria-current="page" href="/admin">Admin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn btn-danger text-white" aria-current="page" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'nav-bar-view',
    props: [],
    components: {

    },
    mounted () {
      const user = JSON.parse(localStorage.getItem("user"));
      this.user = user;
    },
    data () {
      return {
        user: []
      }
    },
    methods: {

      logout(){
        localStorage.setItem('isLogged', 'false')
        this.$store.state.userLogin = false;
        this.$router.push('/')
      },
    },
    computed: {

    }
}


</script>

<style scoped>
  .nav-bar-view {

  }
</style>
