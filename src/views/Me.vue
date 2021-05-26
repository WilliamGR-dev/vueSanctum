<template>
  <div>
    <h1>Profil</h1>
    <table class="w-25 m-auto" v-if="user.data">
      <tr><td><h3>Creer:</h3></td><td>{{user.data.created_at}}</td></tr>
      <tr><td><h3>Name:</h3></td><td>{{user.data.name}}</td></tr>
      <tr><td><h3>Email:</h3></td><td>{{user.data.email}}</td></tr>
    </table>
    <div v-else>Connecte toi stp</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
  name: "Me",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
