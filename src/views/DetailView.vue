<template lang="html">
  <div class="container">
    <h1 style="margin-top: 8%">Detail of the component</h1>
    <section class="d-flex justify-content-center">
        <div class="card col-6 mt-5">
          <div class="p-2" style="align-self: end;">
            <router-link to="/home" class="btn btn-danger rounded-circle">X</router-link>
          </div>
          <div class="d-flex justify-content-center">
            <img :src="this.showProduct.image" class="card-img-top" :alt="this.showProduct.title" style="width: 30%;">
          </div>
          <div class="card-body">
            <h5 class="card-title"><b>{{this.showProduct.title}}</b></h5>
            <p class="card-text" style="text-align: justify">{{this.showProduct.description}}</p>
            <p class="card-text">Price: {{this.showProduct.price}}$</p>
          </div>
        </div>
    </section>
  </div>
</template>

<script lang="js">
import {mapGetters} from 'vuex'
  export default  {
    name: 'detail-view',
    props: [],
    component:{
      
    },
    async mounted () {
      await this.$store.dispatch('showProduct', this.$route.params.id)

        let isLogged = localStorage.getItem("isLogged");

        if (isLogged != "true") {
          this.$router.push("/");
        } else {
          this.$store.state.userLogin = true
        }
    },
    data () {
      return {
        product:[]
      }
    },
    methods: {
      async addToCart(product) {
        await this.$store.dispatch('saveToCart', product);
      },
    },
    computed: {
      ...mapGetters({
        showProduct: 'showProduct'
      })
    }
}
</script>

<style scoped>
  
</style>
