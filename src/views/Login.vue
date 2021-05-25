<template>
  <div>
    <h1>Login</h1>

    <p v-if="msg.success" style="color: green">{{msg.success}}</p>
    <p v-if="msg.error" style="color: red">{{msg.error}}</p>
    <form @submit.prevent="loginUser(form)" class="d-flex justify-content-center flex-column flex-wrap align-items-center" >
      <label for="email">Email</label><br>
      <input type="email" class="form-control w-25" id="email" name="email" v-model="form.email"><br>

      <label for="password">Password</label><br>
      <input type="password" class="form-control w-25" id="password" name="password" v-model="form.password"><br><br>

      <button type="submit" class="btn btn-primary">Connexion</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "Login",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    ...mapActions(['login']),
    loginUser(form){
      this.login(form)
    }
  },
  computed: {
    ...mapGetters(['msg'])
  },
  mounted(){
    this.msg.success = ''
    this.msg.error = ''
  }
}
</script>
