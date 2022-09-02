<template lang="html">
  <div class="container">
    <h1 style="margin-top: 8%">Detail of the component</h1>
    <section class="d-flex justify-content-center">
        <div class="card col-6 mt-5 card-shadow">
          <div class="p-2" style="align-self: end;">
            <a class="button-close rounded-circle" href="/home" style="text-decoration:none">
              <span class="shadow rounded-circle"></span>
              <span class="edge rounded-circle"></span>
              <span class="front text rounded-circle"> X </span>
            </a>
            <!-- <router-link to="/home" class="btn btn-danger rounded-circle">X</router-link> -->
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
  .button-close {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  touch-action: manipulation;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}

.front {
  display: block;
  position: relative;
  padding: 3px 12px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.button-close:hover {
  filter: brightness(110%);
}

.button-close:hover .front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.button-close:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-close:hover .shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.button-close:active .shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-close:focus:not(:focus-visible) {
  outline: none;
}

.card-shadow{
  -webkit-box-shadow: 0px 0px 55px -40px rgba(0,0,0,0.72);
  -moz-box-shadow: 0px 0px 55px -40px rgba(0,0,0,0.72);
  box-shadow: 0px 0px 55px -40px rgba(0,0,0,0.72);
}
</style>
