<template lang="html">
  <section class="home-view container-fluid">
    <h1 style="margin-top: 8%">Computer Components</h1>
    <div class="row mb-5">
      <div class="col-md-8">
        <h3 class="mt-5 border-top">Products</h3>
        <div class="row justify-content-center mt-5">
          <div v-for="(item, index) in this.products" :key="index" class="card" style="width: 18rem;">
            <div class="d-flex justify-content-center">
              <img :src="item.image" class="card-img-top mt-2" :alt="item.title" style="width: 50%;">
            </div>
            <div class="card-body">
              <h5 class="card-title"><b>{{item.title}}</b></h5>
              <p class="card-text mt-3">Price: {{item.price}}$</p>
              <router-link :to="{name:'details',params:{id:item.id, item}}"><a class="btn boton btn-primary m-2">Details</a></router-link>
              <button type="button" class="btn btn-success" @click="addToCart(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="vr mt-5"></div>
      <div class="col-md-3">
      <h3 class="mt-5 border-top">Cart</h3>
        <div class="d-flex justify-content-center mt-5">
          <div class="flex-column">
            <div v-for="(item, index) in this.cart" :key="index" class="card" style="width: 18rem;">
              <div class="p-2" style="align-self: end;">
                <a class="btn btn-danger rounded-circle" @click="deleteCart(item.id)">X</a>
              </div>
              <div class="d-flex justify-content-center">
                <img :src="item.image" class="card-img-top mt-2" :alt="item.title" style="width: 50%;">
              </div>
              <div class="card-body">
                <h5 class="card-title"><b>{{item.title}}</b></h5>
                <p class="card-text mt-3">Price: {{item.price * this.cant}}$</p>
                <div class="row justify-content-center">
                  <button type="button" style="width: 40px;" class="btn btn-primary col" @click="add">+</button>
                  <input type="number" style="width:70px;" min="1" :max="item.amount" v-model="cant">
                  <button type="button" style="width: 40px;" class="btn btn-warning col" @click="remove">-</button>
                </div>
                <div class="d-flex justify-content-center">
                  <a class="btn btn-success m-2" @click="Buy(item.id)">Buy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import {mapGetters} from 'vuex'
  import Swal from 'sweetalert2'
  export default  {
    name: 'home-view',
    props: [],
    components: {
    },
    async mounted () {
      await this.$store.dispatch('showProducts');
      await this.$store.dispatch('getAllCart');
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
        cartData: [],
        cant: 1,
        userData: null,
      }
    },
    methods: {
      async addToCart(product) {
        let payload = {
          productId: product.id,
          amount: this.cant,
          userId: this.userData.id,
        }
        console.log(payload);
        await this.$store.dispatch('saveToCart', payload);
      },
      async deleteCart(id) {
        await this.$store.dispatch('deleteCart', id)
      },
      add(){
        this.cant ++
      },
      remove(){
        this.cant --
        if (this.cant < 1) {
          this.cant = 1
        }
      },
      Buy(id){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Buy!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('deleteCart', id)
            Swal.fire(
              'Success!',
              'You have been bought it with success!.',
              'success'
            )
          }
        })
      }
    },
    computed: {
      ...mapGetters({
        products: 'showProducts',
        cart: 'cart',
      })
    }
}


</script>

<style scoped>

</style>
