<template lang="html">
  <section class="admin-edit-view container" style="margin-top: 8%">
    <div class="row justify-content-center">
      <div class="card col-6 mt-5">
        <h1 class="text-center mt-5">Edit the Product</h1>
        <div class="card-body shadow-5-strong text-center">
          <p class="card-title">Title: <input type="text" name="title" v-model="title" class="form-control"></p>
          <p class="card-text"> Description:<input type="text" name="description" v-model="description" class="form-control"></p>
          <p class="card-text">Price: <input type="number" name="price" v-model="price" class="form-control"></p>
          <p class="card-text">Amount: <input type="number" name="amount" v-model="amount" class="form-control"></p>
          <label for="formFile" class="form-label">Image (link):</label>
          <input class="form-control mb-4" type="url" id="formFile" v-model="image">
          <button type="button" class="btn btn-primary" @click="save">Save</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import {mapGetters} from 'vuex'
  export default  {
    name: 'admin-edit-view',
    props: [],
    components: {
      
    },
    async mounted () {

      let id = this.$route.params.id;

      let isLogged = localStorage.getItem("isLogged");

      if (isLogged != "true") {
        this.$router.push("/");
      } else {
        this.$store.state.userLogin = true
      }

      await this.$store.dispatch('showProduct', id)

      this.title = this.prod.title
      this.description = this.prod.description
      this.price = this.prod.price
      this.amount = this.prod.amount
      this.image = this.prod.image

      const user = JSON.parse(localStorage.getItem("user"));
      if (user.isAdmin != true) {
        this.$router.push("/home");
      }
    },
    data () {
      return {
        title: '',
        description: '',
        price: '',
        amount: '',
        image: ''
      }
    },
    methods: {
    async save() {
        let id = this.$route.params.id;
        let data = {
          id: id,
          title: this.title,
          description: this.description,
          price: this.price,
          amount: this.amount,
          image: this.image
        }
        await this.$store.dispatch('saveEdit', data)
      },
    },
    computed: {
      ...mapGetters({
        prod: 'showProduct'
      })
    }
}


</script>

<style scoped>

</style>
