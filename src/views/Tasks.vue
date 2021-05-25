<template>
  <div>
    <div>
      <h1>Task: </h1>
      <form v-if="user.token">
        <p v-if="msg.success" style="color: green">{{msg.success}}</p>
        <p v-if="msg.error" style="color: red">{{msg.error}}</p>
        <div class="form-group">
          <label for="body">Body:</label><br>
          <textarea type="text" name="body" class="form-control" id="exampleFormControlInput1" v-model="form.body"></textarea><br>
        </div>
        <button type="button" class="btn btn-primary" v-if="form.body.length !=0" @click.prevent="create(form)">✅Ajouter✅</button>
      </form>
      <div v-else>Not logged.</div>
    </div>
    <h1>Taches a ne pas faire: </h1>
    <div v-if="user.token">
      <br>
      <div v-for="task in tasks" :key="task.id" class="container">
        <br>
        <div class="task">
          <br>
          <div>
            <p>{{ task.body }}</p>
            <button v-if="flag != task.id" type="button" @click.prevent="show(task.id)">Show Form Modify</button>
            <button v-if="flag == task.id" type="button"  @click.prevent="hide()">Close Form Modify</button>
            <form v-if="flag == task.id">
              <input type="text" name="body" v-model="taskSelected.body">
              <button type="button" class="btn btn-primary" @click.prevent="update(task.id)">Modifier</button>
            </form>
            <button type="button" class="btn btn-danger" @click.prevent="deleteT(task.id)">Supprimer</button>
          </div>
        </div>
        <br><br>
      </div>
    </div>
    <div v-else>Not logged.</div>
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
<style scoped>
.container{
  display: flex;
  justify-content: center;
}
.task{
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  margin: 5px;
  width: 50%;
  font-weight: 600;
}
.task a{
  color: #149e2b;
}
</style>