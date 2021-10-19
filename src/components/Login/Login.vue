<template>
  <div class="container mt-5 mb-5">
    <div class="row g-4 d-flex align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5">
          <h2 class="text-center text-black fw-bold">Login</h2>

          <div class="form-input">
            <i class="fa fa-envelope"></i>
            <input v-model="email" type="text" class="form-control" placeholder="Email address">
          </div>
          <div  class="form-input">
            <i class="fa fa-lock"></i>
            <input v-model="password" type="password" class="form-control" placeholder="password">
          </div>
          <button @click="login" class="btn btn-primary mt-4 signup">login</button>
          <div class="form-input">
            Don't have an account?
            <router-link to="/signup">Sign Up</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './login.css'
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async login() {
      await axios.get(` http://localhost:3000/user?email=${this.email}&password=${this.password}`).then(response=>{
        if (response.data.length>0) {
          alert("Welcome "+ response.data[0].name)
          localStorage.setItem('isSignedUp', 'true')
          localStorage.setItem("user-info", JSON.stringify(response.data))
          this.$router.push({name: "Home"})
        }else {
          alert("Bad Credential")
        }
      })


    }
  }
};
</script>
