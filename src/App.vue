<template>
  <div id="nav">

    <div v-if="user.token">
      <router-link to="/me">Profil</router-link> |
      <router-link to="/tasks">Tâches</router-link> |
      <a href="/login" @click.prevent="logout">Déconnexion</a>
    </div>

    <div v-if="!user.token">
      <router-link to="/register">Inscription</router-link> |
      <router-link to="/login">Connexion</router-link>
    </div>

  </div>
  <router-view/>
</template>
<script>

import { mapActions, mapGetters } from "vuex"


export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
