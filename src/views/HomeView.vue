<template lang="html">
  <div>
    <svg style="transform: rotate(180deg); width: fit-content" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="1920" height="250" preserveAspectRatio="none" viewBox="0 0 1920 250"><g mask="url(&quot;#SvgjsMask1038&quot;)" fill="none"><path d="M28 250L278 0L563 0L313 250z" fill="url(#SvgjsLinearGradient1039)"></path><path d="M347.8 250L597.8 0L882.8 0L632.8 250z" fill="url(#SvgjsLinearGradient1039)"></path><path d="M686.6 250L936.6 0L1179.6 0L929.6 250z" fill="url(#SvgjsLinearGradient1039)"></path><path d="M971.4000000000001 250L1221.4 0L1290.4 0L1040.4 250z" fill="url(#SvgjsLinearGradient1039)"></path><path d="M1874 250L1624 0L1177 0L1427 250z" fill="url(#SvgjsLinearGradient1040)"></path><path d="M1561.2 250L1311.2 0L865.7 0L1115.7 250z" fill="url(#SvgjsLinearGradient1040)"></path><path d="M1273.4 250L1023.4000000000001 0L631.9000000000001 0L881.9000000000001 250z" fill="url(#SvgjsLinearGradient1040)"></path><path d="M919.5999999999999 250L669.5999999999999 0L495.5999999999999 0L745.5999999999999 250z" fill="url(#SvgjsLinearGradient1040)"></path><path d="M1768.4726999130787 250L1920 98.47269991307866L1920 250z" fill="url(#SvgjsLinearGradient1039)"></path><path d="M0 250L151.52730008692134 250L 0 98.47269991307866z" fill="url(#SvgjsLinearGradient1040)"></path></g><defs><mask id="SvgjsMask1038"><rect width="1920" height="250" fill="#ffffff"></rect></mask><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1039"><stop stop-color="rgba(4, 170, 128, 0.6)" offset="0"></stop><stop stop-opacity="0" stop-color="rgba(4, 170, 128, 0.6)" offset="0.66"></stop></linearGradient><linearGradient x1="100%" y1="100%" x2="0%" y2="0%" id="SvgjsLinearGradient1040"><stop stop-color="rgba(4, 170, 128, 0.6)" offset="0"></stop><stop stop-opacity="0" stop-color="rgba(4, 170, 128, 0.6)" offset="0.66"></stop></linearGradient></defs></svg>
  </div>
  <section class="home-view container-fluid">
    <div class="content">
      <h1 style="margin-top: -3%">Computer Components</h1>
    </div>
    <div class="row mb-5">
      <div class="col-md-8">
        <h3 class="mt-5 border-top">Products</h3>
        <div class="row justify-content-around mt-5">
          <div v-for="(item, index) in this.products" :key="index" class="card card-shadow" style="width: 18rem; margin-top:2%; border-radius: 15px;">
            <div class="d-flex justify-content-center">
              <img :src="item.image" class="card-img-top mt-2" :alt="item.title" style="width: 50%;">
            </div>
            <div class="card-body">
              <h5 class="card-title"><b>{{item.title}}</b></h5>
              <p class="card-text mt-3">Price: {{item.price}}$</p>
              <router-link :to="{name:'details',params:{id:item.id, item}}"><a class="button-details m-2">Details</a></router-link>
              <button type="button" class="button-cart" @click="addToCart(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="vr mt-5"></div>
      <div class="col-md-3">
      <h3 class="mt-5 border-top">Cart</h3>
        <div class="d-flex justify-content-center mt-5">
          <div class="flex-column">
            <div v-for="(item, index) in this.cart" :key="index" class="card card-shadow" style="width: 18rem; margin-top:9%; border-radius: 15px;">
              <div class="p-2" style="align-self: end;">
                  <button class="button-close rounded-circle" @click="deleteCart(item.id)">
                    <span class="shadow rounded-circle"></span>
                    <span class="edge rounded-circle"></span>
                    <span class="front text rounded-circle"> X </span>
                  </button>
              </div>
              <div class="d-flex justify-content-center">
                <img :src="item.image" class="card-img-top mt-2" :alt="item.title" style="width: 50%;">
              </div>
              <div class="card-body">
                <h5 class="card-title"><b>{{item.title}}</b></h5>
                <p class="card-text mt-3">Price: {{item.price * item.amount}}$</p>
                <div class="d-flex justify-content-center form-group" style="align-items:center">
                  <button type="button" class="btn btn-primary col button-add" @click="add(item)">+</button>
                  <input type="number" style="width:70px; height: fit-content;" min="1" class="form-control" :max="item.amount" v-model="item.amount">
                  <button type="button" class="btn btn-warning col button-remove" @click="remove(item)">-</button>
                </div>
              </div>
            </div>
            <div v-if="this.cart.length > 0" class="d-flex justify-content-center">
                <a class="btn btn-success m-2 button mt-4" @click="Buy2()">Comprar todo</a>
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
        await this.$store.dispatch('saveToCart', payload);
      },
      async deleteCart(id) {
        await this.$store.dispatch('deleteCart', id)
      },
      add(item){
        this.$store.dispatch('addCartAmount', item)
      },
      async remove(item){
        if (item.amount < 2) {
          await this.$store.dispatch('deleteCart', item.id)
        } else {
          this.$store.dispatch('removeCartAmount', item)
        }
      },
      async Buy2(){
        Swal.fire({
          title: 'Do you want to but it?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Buy!'
        }).then((result) => {
          if (result.isConfirmed) {
            const user = localStorage.getItem("user");
            this.$store.dispatch('saveHistorical', {cart: JSON.stringify(this.cart), userId: (JSON.parse(user)).id})
            this.cart.forEach( (item) => {
              console.log(item);
              this.$store.dispatch('deleteCart', item.id)
            })
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

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}

.card-shadow{
  -webkit-box-shadow: 0px 0px 55px -40px rgba(0,0,0,0.72);
  -moz-box-shadow: 0px 0px 55px -40px rgba(0,0,0,0.72);
  box-shadow: 0px 0px 55px -40px rgba(0,0,0,0.72);
  transition: all 0.3s ease 0s;
}


.card-shadow:hover {
  box-shadow: 5px 5px 20px rgba(0,0,0,0.4);
  transform: translateY(-7px);
}

.card-shadow:active {
  transform: translateY(-1px);
}

.button {
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  background-color: #1b9565;  
  color: white;
}

.button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.button:active {
  transform: translateY(-1px);
}

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

.button-cart {
  --color: #00A97F;
  /* padding: 0.8em 1.7em; */
  background-color: transparent;
  border-radius: .3em;
  border-color: #00A97F;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: .5s;
  font-weight: 400;
  font-size: 17px;
  border: 1px solid;
  font-family: inherit;
  text-transform: uppercase;
  color: var(--color);
  z-index: 1;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);

}

.button-cart::before, .button-cart::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  background-color: var(--color);
  transition: 1s ease;
}

.button-cart::before {
  top: -1em;
  left: -1em;
}

.button-cart::after {
  left: calc(100% + 1em);
  top: calc(100% + 1em);
}

.button-cart:hover::before, .button-cart:hover::after {
  height: 410px;
  width: 410px;
}

.button-cart:hover {
  color: white;
}

.button-cart:active {
  filter: brightness(.8);
}

.button-details {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 0px 10px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #725AC1;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #725AC1;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #725AC1;
}

.button-details:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #725AC1;
}

.button-details:active {
  transform: scale(0.9);
}

.button-add {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 0px 10px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: blue;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid blue;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 blue;
}

.button-add:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 blue;
}

.button-add:active {
  transform: scale(0.9);
}

.button-remove {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 0px 10px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: black;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid yellow;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 yellow;
}

.button-remove:hover {
  color: black;
  box-shadow: inset 0 -100px 0 0 yellow;
}

.button-remove:active {
  transform: scale(0.9);
}
</style>
