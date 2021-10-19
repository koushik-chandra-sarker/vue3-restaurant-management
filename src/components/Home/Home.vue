<template>
  <Navbar/>

  <div class="container mt-4">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <button @click="showAddForm = !showAddForm" class="btn btn-outline-primary  ">
          <span v-if="!showAddForm">Add</span>
          <span v-if="showAddForm">X</span>
        </button>
      </div>
    </div>
    <div v-if="showAddForm" class="row g-3">
      <div class="col-6 col-md-4 ">
        <input v-model="restaurant.name" class="form-control" type="text" placeholder="Name">
      </div>
      <div class="col-6 col-md-3 ">
        <input v-model="restaurant.contact" class="form-control" type="text" placeholder="Contact">
      </div>
      <div class="col col-md-4 ">
        <input v-model="restaurant.address" class="form-control" type="text" placeholder="Address">
      </div>
      <div class="col col-md-1 d-grid">
        <button @click="addRestaurant" class=" full-width btn btn-primary">submit</button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Contact</th>
        <th scope="col">Address</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(restaurant, index) in restaurants" :key="restaurant.id">
        <th scope="row">{{ restaurant.id }}</th>
        <td>{{ restaurant.name }}</td>
        <td>{{ restaurant.contact }}</td>
        <td>{{ restaurant.address }}</td>
        <td >
          <button @click="setModal(restaurant, index)" class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#updateRestaurantModal">Update</button>
          <button @click="deleteData(restaurant.id)" class="btn btn-danger" >delete</button>
          </td>
      </tr>
      </tbody>
    </table>
  </div>

<!--    update modal-->
  <div class="modal fade" id="updateRestaurantModal" tabindex="-1" aria-labelledby="updateRestaurantLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateRestaurantLabel">Update</h5>
          <button id="updateRestaurantModalCloseBtn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row g-4">
            <div class="col-12 ">
              <input v-model="updatedData.id" class="form-control" style="color: #0d6efd" type="text" placeholder="Id" readonly>
            </div>
            <div class="col-12 ">
              <input v-model="updatedData.name" class="form-control" type="text" placeholder="Name">
            </div>
            <div class="col-12 ">
              <input v-model="updatedData.contact" class="form-control" type="text" placeholder="Contact">
            </div>
            <div class="col-12 ">
              <input v-model="updatedData.address" class="form-control" type="text" placeholder="Address">
            </div>
            <div class="col-12 d-grid mb-4">
              <button @click="update(updatedData.index)" class=" full-width btn btn-primary">submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";

export default {
  name: 'Home',
  components: { Navbar},
  data() {
    return {
      user: {},
      restaurants: [],
      restaurant: {
        name: '',
        contact: '',
        address: ''
      },
      updatedData: {
        index:"",
        id:'',
        name: '',
        contact: '',
        address: ''
      },
      showAddForm: false,
    }

  },
  methods: {
    async addRestaurant() {
      await axios.post("http://localhost:3000/restaurant",
          {
            name: this.restaurant.name, contact: this.restaurant.contact, address: this.restaurant.address
          }
      ).then(response => {
        if (response.status == 201) {
          this.restaurant.name = ''
          this.restaurant.contact = ''
          this.restaurant.address = ''
          this.showAddForm = false
          this.restaurants.push(response.data)
        }
      })
    },
    setModal(restaurant, index){
      this.updatedData.index=index;
      this.updatedData.id=restaurant.id;
      this.updatedData.name=restaurant.name;
      this.updatedData.contact=restaurant.contact;
      this.updatedData.address=restaurant.address;
    },
    update(index){
      axios.put(`http://localhost:3000/restaurant/${this.updatedData.id}`,
          {
            name: this.updatedData.name, contact: this.updatedData.contact, address: this.updatedData.address
          }
      ).then(response => {
       if (response.status==200){
         this.restaurants[index].name=response.data.name
         this.restaurants[index].contact=response.data.contact
         this.restaurants[index].address=response.data.address
         document.getElementById('updateRestaurantModalCloseBtn').click();
       }
      })
    },
    deleteData(id){

      axios.delete(`http://localhost:3000/restaurant/${id}`).then(response => {
        if (response.status==200){
          alert("Delete Successful")
          this.restaurants = this.restaurants.filter(value => value.id!=id);
        }
      })
    }

  },
  mounted() {
    if (!localStorage.getItem('isSignedUp')) {
      this.$router.push({name: "Signup"})
    }
    let user = localStorage.getItem('user-info')
    if (user) {
      this.user = JSON.parse(user);
    }

    axios.get("http://localhost:3000/restaurant").then(response => {
      this.restaurants = response.data
    })
  }
};
</script>
