<template>
  <NavBarView v-if="this.$store.state.userLogin == true"/>
  <router-view/>
</template>

<script>
  import NavBarView from './components/NavBarView.vue'
  export default  {
      name: 'admin-view',
      props: [],
      components: {
        NavBarView
      },
      mounted () {

      },
      data () {
        return {
          
        }
      },
      methods: {
        
      },
      computed: {

      }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
