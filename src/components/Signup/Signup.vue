<template>
  <div class="container mt-5 mb-5 signup">
    <div class="row g-4 d-flex align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5">
          <h2 class="text-center text-black fw-bold">SignUp</h2>

          <div class="form-input"><i class="fa fa-envelope"></i>
            <input type="text" v-model="email" class="form-control" placeholder="Email address">
          </div>
          <div class="form-input">
            <i class="fa fa-user"></i>
            <input type="text" v-model="name" class="form-control" placeholder="Full Name">
          </div>
          <div class="form-input">
            <i class="fa fa-lock"></i>
            <input type="password" v-model="password" class="form-control" placeholder="password">
          </div>

          <button v-on:click="signUp" class="btn btn-primary mt-4 signup">Sign Up</button>
          <div class="form-input">
            Already have an account? <router-link to="/login">Login</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './signup.css'
import axios from "axios"

export default {
  name: 'Signup',
  data(){
    return{
      name:"",
      email:"",
      password:""
    }
  },
  methods:{
    async signUp(){
       let response = await axios.post(
          " http://localhost:3000/user",
          {
            name: this.name, email: this.email, password: this.password
          })
      if (response.status==201){
        localStorage.setItem('isSignedUp', 'true')
        this.name=''
        this.email=''
        this.password=''

        // redirect to Home page
        await this.$router.push({name: "Home"})
      }

    }
  },
  mounted(){
    if(localStorage.getItem('isSignedUp')){
      this.$router.push({name: "Home"})
    }
  }
};
</script>
