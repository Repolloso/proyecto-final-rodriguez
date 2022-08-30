<template lang="html">
  <section class="container">
    <h1 style="margin-top: 8%">Admin Control 👷‍♂️</h1>
    <div class="d-flex justify-content-start">
      <a href="/admin/create" class="btn btn-success mt-5">New Product</a>
    </div>
    <table class="table table-striped table-responsive mt-2 mb-5">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Image</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(items, index) in this.products" :key="index">
          <td class="align-middle">
            <b>{{items.id}}</b>
          </td>
          <td style="text-align: justify" class="border-end border-start align-middle">
            <b>{{items.title}}</b>
          </td>
          <td style="text-align: justify" class="border-end border-start align-middle">
            <img :src="items.image" :alt="items.title" style="width: 100%;">
          </td>
          <td style="text-align: justify" class="border-end align-middle">
            {{items.description}}
          </td>
          <td v-if="items.amount < 20" class="text-danger border-end align-middle">
            {{items.amount}}
          </td>
          <td v-else-if="items.amount >= 20 && items.amount <= 50" class="text-warning border-end align-middle">
            {{items.amount}}
          </td>
          <td v-else class="text-success border-end align-middle">
            {{items.amount}}
          </td>
          <td class="border-end align-middle">
            {{items.price}}$
          </td>
          <td class="align-middle">
            <div class="row justify-content-center">
              <button type="button" style="width: auto;" class="btn btn-primary mb-1" @click="editProduct(items.id)"><i class="bi bi-pencil-square"></i></button>
              <button type="button" style="width: auto;" class="btn btn-danger" @click="deleteButton(items.id)"><i class="bi bi-trash-fill"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="js">
  import {mapGetters} from 'vuex'
  import Swal from 'sweetalert2';
  export default  {
    name: 'admin-view',
    props: [],
    component: {
    },
    mounted () {
      this.$store.dispatch('showProducts');

      let isLogged = localStorage.getItem("isLogged");

      if (isLogged != "true") {
        this.$router.push("/");
      } else {
        this.$store.state.userLogin = true
      }
    },
    data () {
      return {

      }
    },
    methods: {
      editProduct(id) {
        this.$router.push({path: "/admin/edit/" + id});
      },
      deleteButton(id){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('deleteProduct', id);
          }
        })
      },
    },
    computed: {
      ...mapGetters({
        products: 'showProducts'
      })
    }
}


</script>

<style scoped>
  
</style>
