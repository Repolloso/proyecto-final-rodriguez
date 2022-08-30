<template lang="html">

  <section class="register-view">
    <div class="wrapper wow fadeInDown">
        <div class="logo">
            <img src="../assets/logo.png" alt="logo_vue">
        </div>
        <div class="text-center mt-4 name">
            Register
        </div>
        <div v-if="errors.length > 0" class="alert alert-danger alert-dismissible fade show" role="alert">
          <p v-if="errors.length > 0" class="text-start mt-3">Errors Detected:</p>
          <li v-for="error in errors" :key="error.index" align="left">{{ error }}</li>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <form class="p-3 mt-3" @submit.prevent="ValidateData" method="POST">
              <!-- Name -->
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="name" id="name" placeholder="Username" v-model="name">
            </div>
              <!-- Email -->
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="email" name="email" id="userEmail" placeholder="Email" v-model="email">
            </div>
            <!-- Passwoord -->
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" v-model="password">
            </div>
            <!-- Select -->
            <div style="text-align: initial" class="mb-1">
              <label for="rol">Select user type</label>
            </div>
            <div class="d-flex align-items-center">
              <span class="fas fa-key"></span>
              <select name="rol" v-model="user_rol" style="width: 100%" class="form-field">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <!-- Button -->
            <button class="btn mt-3">Register</button>
        </form>
        <div class="text-center fs-6">
            <a href="/">Login</a>
        </div>
    </div>
  </section>

</template>

<script lang="js">
import { required } from '@vuelidate/validators';
  export default  {
    name: 'register-view',
    props: [],
    data () {
      return {
        name: '',
        password: '',
        email: '',
        isAdmin: false,
        user_rol: '',
        errors: []
      }
    },
    validations () {
      return { 
        name: { required }, 
        email: { required }, 
        password: { required }
      }
    },
    methods: { 
      ValidateData (e) {
        this.errors = []
        let nameRegex = /^[a-zA-Z]{3,}$/;
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // ! Name
        if(!this.name) {
          this.errors.push('Name is required');
        }else if (!nameRegex.test(this.name)) {
          this.errors.push('Invalid Name')
        } else if (this.name.length > 8) {
          this.errors.push('The name must have at least 8 characters')
        }
        // ! Email
        if (!this.email) {
          this.errors.push('Email is required');
        }else if (!emailRegex.test(this.email)) {
          this.errors.push('Invalid Email')
        } else if (this.email.length > 30) {
          this.errors.push('The email must have a maximum of 30 characters')
        }
        // ! Password
        if (!this.password) {
          this.errors.push('Password is required')
        }else if (this.password.length > 10) {
          this.errors.push('The password must have a maximum of 10 characters')
        }
        // ! Select
        if (!this.user_rol) {
          this.errors.push('Password is required')
        }else if (this.password.length > 10) {
          this.errors.push('The password must have a maximum of 10 characters')
        }

        if (this.errors.length > 0) {
            e.preventDefault();
        } else {
            this.SendData();
        }
      },
      SendData(){
        if (this.user_rol == "admin") {
          this.isAdmin = true;
        }
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin
        }
        this.$store.dispatch('register', data)
      }
    },
    computed: {

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Reseting */
* {
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: #ecf0f3;
}

.wrapper {
    max-width: 350px;
    min-height: 500px;
    margin: 80px auto;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.logo {
    width: 80px;
    margin: auto;
}

.logo img {
    width: 100%;
    height: 80px;
    padding-top: 5%;
    object-fit: cover;
    border-radius: 10%;
    box-shadow: 0px 0px 3px #5f5f5f,
        0px 0px 0px 5px #ecf0f3,
        8px 8px 15px #a7aaa7,
        -8px -8px 15px #fff;
}

.wrapper .name {
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: 1.3px;
    padding-left: 10px;
    color: #555;
}

.wrapper .form-field input {
    width: 100%;
    display: block;
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    /* border: 1px solid red; */
}

.wrapper .form-field {
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
    color: #555;
}

.wrapper .btn {
    box-shadow: none;
    width: 100%;
    height: 40px;
    background-color: #41B883;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,-3px -3px 3px #fff;
    letter-spacing: 1.3px;
}

.wrapper .btn:hover {
    background-color: #35956a;
}

.wrapper a {
    text-decoration: none;
    font-size: 0.8rem;
    color: #03A9F4;
}

.wrapper a:hover {
    color: #039BE5;
}

@media(max-width: 380px) {
    .wrapper {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}
</style>
