import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
export default createStore({
  state: {
    userList:[],
    cartList:[],
    productList:[],
    userLogin: false,
    showProduct:[],
  },
  getters: {
      User_List: (state) => {
        return state.userList
      },
      showProducts: (state) => {
        return state.productList
      },
      showProduct: (state) => {
        return state.showProduct
      },
      cart(state){
        let products = state.productList
        let data_user = localStorage.getItem("user")
        let user = JSON.parse(data_user)
        let carts  = state.cartList.filter(o => o.userId === user.id)
        let localCart = []
        carts.map(item=>{
            let currentProduct = products.filter(o=> o.id == item.productId)
            localCart.push({
                id: item.id,
                image:currentProduct[0]?.image,
                amount: item.amount,
                productTitle: currentProduct[0]?.title,
                price: currentProduct[0]?.price
            })
        })
        return localCart
    },
  },
  mutations: {
    LOGIN: (state, data) => {
        state.userList = data
    },
    SAVE_PRODUCTS: (state, products) => {
      state.productList = products;
    },
    SAVE_PRODUCT: (state, product) => {
      state.showProduct = product;
    },
    ADD_CART_LIST: (state, product) => {
      state.cartList.unshift(product);
    },
    DELETE_CART_LIST:(state, data) => {
      state.
      state.cartList.shift(data);
    },
    SET_CART: (state, cart) => {
      state.cartList = cart;
    },
  },
  actions: {
    async register(context, payload) {
      try {
          await axios.post('https://630437490de3cd918b438a21.mockapi.io/users', payload)
          router.push('/');
      } catch (err){
          console.log(err)
      }
    },
    async login(context) {
      try {
          let resp = await axios.get('https://630437490de3cd918b438a21.mockapi.io/users')
          context.commit('LOGIN', resp.data);
      } catch (error) {
          console.log(error)
      }
    },
    async createProduct(context, payload) {
      try{
          await axios.post("https://630437490de3cd918b438a21.mockapi.io/products", {
              title: payload.title,
              description: payload.description,
              price: payload.price,
              amount: payload.amount,
              image: payload.image
          })
      } catch(e) {
          console.log(e)
      }
    },
    async showProducts(context) {
      try{
          let resp = await axios.get("https://630437490de3cd918b438a21.mockapi.io/products")
          context.commit('SAVE_PRODUCTS', resp.data)
      } catch(e) {
          console.log(e)
      }
    },
    async deleteProduct(context, id) {
      await axios.delete("https://630437490de3cd918b438a21.mockapi.io/products/" + id)
      .then(response => {
          console.log(response);
          context.dispatch('showProducts')
      })
      .catch(error => {
          console.log(error);
      });
    },
    async showProduct(context, id) {
      let prod = await axios.get("https://630437490de3cd918b438a21.mockapi.io/products/" + id)
      context.commit('SAVE_PRODUCT', prod.data);
    },
    async saveEdit(context, payload) {      
      await axios.put(`https://630437490de3cd918b438a21.mockapi.io/products/${payload.id}`, {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        amount: payload.amount,
        image: payload.image
      })
      router.push('/admin');
    },
    async saveToCart(context, payload) {
      try {
        let resp = await axios.post(`https://630437490de3cd918b438a21.mockapi.io/cart`, payload)
        context.commit('ADD_CART_LIST', resp.data);
      } catch (e){
        console.log(e)
      }
    },
    async getAllCart(context) {
      try{
          let resp = await axios.get(`https://630437490de3cd918b438a21.mockapi.io/cart`)
          context.commit('SET_CART', resp.data)
      } catch(e) {
          console.log(e)
      }
    },
    async deleteCart(context, payload) {
      try{
        await axios.delete("https://630437490de3cd918b438a21.mockapi.io/cart/" + payload)
        context.dispatch('getAllCart')
      }catch(e) {
        console.log(e)
      }
    },
    async addCartAmount(context, payload) {
      let data = this.state.cartList.findIndex(o => o.id === payload.id)
      if (data > -1) {
        this.state.cartList[data].amount ++
        await axios.put(`https://630437490de3cd918b438a21.mockapi.io/cart/${payload.id}`, {
          amount: this.state.cartList[data].amount
        })
      }
    },
    async removeCartAmount(context, payload) {
      let data = this.state.cartList.findIndex(o => o.id === payload.id)
      if (data > -1) {
        this.state.cartList[data].amount --
        await axios.put(`https://630437490de3cd918b438a21.mockapi.io/cart/${payload.id}`, {
          amount: this.state.cartList[data].amount
        })
      }
    }
  },
  modules: {
  }
})
