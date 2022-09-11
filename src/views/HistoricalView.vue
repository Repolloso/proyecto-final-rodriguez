<template lang="html">

  <section class="historical-view">
    <div class="container">
    <h1 style="margin-top: 8%">Historical Buys ⏳</h1>
      <div class="d-flex justify-content-center flex-column">
        <div v-for="item in this.showHistorical" :key="item.id">
          <div v-for="item in item" :key="item.id" class="card mb-3 mt-5 col-md-10 m-auto">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img :src="item.image" class="card-img" :alt="item.productTitle" style="width:inherit">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title text-start"><strong>{{item.productTitle}}</strong></h5>
                  <p class="card-text text-start">${{item.price}}</p>
                  <p class="card-text text-start">{{item.amount}} units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!this.showHistorical" class="mt-5">
          <img src="../assets/empty_historical.svg" alt="empty" class="img-fluid">
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import {mapGetters} from 'vuex'
  export default  {
    name: 'historical-view',
    props: [],
    async mounted () {
      await this.$store.dispatch('getHistorical')

      let isLogged = localStorage.getItem("isLogged");
      
      if (isLogged != "true") {
        this.$router.push("/");
      } else {
        this.$store.state.userLogin = true
      }
      const user = localStorage.getItem("user");
      this.userData = JSON.parse(user)
    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {
      ...mapGetters({
        showHistorical: 'historical'
      })
    }
}


</script>

<style scoped>

</style>
