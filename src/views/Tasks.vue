<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-centerw-100 d-flex flex-column justify-content-center align-items-center">
    <div>
      <form v-if="user.token">
        <h1>Ajouter une tache: </h1>
        <p v-if="msg.success" style="color: green">{{msg.success}}</p>
        <p v-if="msg.error" style="color: red">{{msg.error}}</p>
        <div class="form-group">
          <label>Content:</label>
          <textarea type="text" name="body" class="form-control" id="exampleFormControlInput1" v-model="form.body"></textarea><br>
        </div>
        <button type="button" class="btn btn-primary" v-if="form.body.length !=0" @click.prevent="create(form)">Ajouter taches</button>
      </form>
      <div v-else>Not connected</div>
    </div>
    <div v-if="user.token">
      <h1>Dont do it: </h1>
      <table class="table table-striped table-sm" style="background: rgba(128,128,128,0.05); border-radius: 5px;width: 700px">
        <tr>
          <td><h5>Contenu</h5></td>
          <td></td>
          <td><h5>Modifier</h5></td>
          <td><h5>Supprimer</h5></td>
        </tr>
      <tr v-for="task in tasks" :key="task.id" >
          <td>{{ task.body }}</td>
          <td class="m-4">
            <form v-if="flag == task.id">
              <input type="text" name="body" class="m-4" v-model="taskSelected.body">
              <button type="button" class="btn btn-primary m-4" @click.prevent="update(task.id)">Modifier</button>
            </form>
          </td>
          <td>
            <button v-if="flag != task.id" type="button" class="btn btn-primary m-3" @click.prevent="show(task.id)">Show Form Modify</button>
            <button v-if="flag == task.id" type="button"  class="btn btn-primary m-3" @click.prevent="hide()">Close Form Modify</button>
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click.prevent="deleteT(task.id)">Supprimer</button>
          </td>
      </tr>
      </table>
    </div>
    <div v-else>Pas connecter</div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"
export default {
  name: "Tasks",
  data() {
    return {
      form: {
        body: ''
      },
      flag: '',
      taskSelected: {
        id: '',
        body: '',
      }
    };
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['tasks']),
    ...mapGetters(['msg'])

  },
  methods: {
    ...mapActions(['tasks_user']),
    ...mapActions(['createTask']),
    ...mapActions(['updateTask']),
    ...mapActions(['deleteTask']),
    create(form){
      this.createTask(form)
    },
    show(id){
      this.flag = id;
    },
    hide(){
      this.flag = 0;
    },
    update(taskId){
      this.taskSelected.id = taskId
      this.updateTask(this.taskSelected)
    },
    deleteT(idTask){
      this.deleteTask(idTask)
    }

  },
  mounted(){
    this.msg.success = ''
    this.tasks_user()
    console.log("taches" + this.tasks)
  }
}
</script>