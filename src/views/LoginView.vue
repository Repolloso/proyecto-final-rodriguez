<template lang="html">

<section class="login-view">
    <div class="wrapper wow fadeInDown">
        <div class="logo">
            <img src="../assets/logo.png" alt="logo_vue">
        </div>
        <div class="text-center mt-4 name">
            Login
        </div>
        <div v-if="errors.length > 0" class="alert alert-danger alert-dismissible fade show" role="alert">
            <p class="text-start">Errors Detected:</p>
            <div>
                <li v-for="error in errors" :key="error.index" align="left">{{ error }}</li>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        <form class="p-3 mt-3" @submit.prevent="login">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Username" v-model="name">
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" v-model="password">
            </div>
            <button type="sumbit" class="btn mt-3">Login</button>
        </form>
        <div class="text-center fs-6">
            <a href="/register">Sign up</a>
        </div>
    </div>
</section>

</template>

<script lang="js">
import {mapGetters, mapState} from 'vuex'
export default  {
    name: 'login-view',
    props: [],
    data () {
        return {
            name: '',
            password: '',
            errors: [],
            users:[]
        } 
    },
    async mounted () {
        const response = await this.user_list
        this.users = response
    },  
    methods: {
    async login () {

        if (!this.name) {
            this.errors.push('Name is required')
        }
        if (!this.password) {
            this.errors.push('Password is required')
        }
        if (this.name && this.password) {
            await this.$store.dispatch('login')
        }

        let data = this.user_list.find((x) => x.name === this.name && x.password === this.password);

        localStorage.clear();

        if (this.user_list) {
            if (data) {
                localStorage.setItem("isLogged", "true");
                const payload = localStorage.setItem("user", JSON.stringify(data));
                this.$store.commit('SET_CURRENT_USER', payload)

                if (data?.isAdmin) {
                    this.$store.state.userLogin = true
                    this.$router.push("/admin");
                } else {
                    this.$store.state.userLogin = true
                    this.$router.push("/home");
                }
            } else {
                this.errors.push("Wrong name or password");
            }
        }
        }
    },
    computed: {
        ...mapGetters({
            user_list: 'User_List'
        }),
        ...mapState({
            userLogin: 'userLogin'
        })
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
