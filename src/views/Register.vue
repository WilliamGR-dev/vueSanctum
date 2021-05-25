<template>
  <div>
    <h1>Register</h1>
    <p v-if="msg.success" style="color: green">{{msg.success}}</p>
    <p v-if="msg.error" style="color: red">{{msg.error}}</p>
    <form @submit.prevent="regist(form)">

      <label for="email">Email</label><br>
      <input type="email" id="email" name="email" v-model="form.email"><br>

      <label for="name">Name</label><br>
      <input type="text" id="name" name="name" v-model="form.name"><br>

      <label for="password">Password</label><br>
      <input type="password" id="password" name="password" v-model="form.password"><br><br>

      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
  </div>
</template>

<script>


import { mapActions } from 'vuex'
import { mapGetters } from "vuex"
export default {
  name: "Register",
  data() {
    return {
      form: {}
    };
  },
  computed: {
    ...mapGetters(['msg'])
  },
  methods: {
    ...mapActions(['register']),
    regist(form){
      this.register(form)
    }
  },
  mounted(){
    this.msg.success = ''
    this.msg.error = ''
  }
}
</script>
