<template>
  <h3>Main room</h3>
  <div class="room-wrapper">
    <TaskLink :task="tasks[0] ?? {}"/>
    <PokerCards/>
    <UsersList :users="users" :result="result"/>
    <TasksList :tasks="tasks"/>
  </div>
</template>

<script>
import PokerCards from "@/components/Cards";
import TaskLink from "@/components/TaskLink";
import UsersList from "@/components/UsersList";
import TasksList from "@/components/TasksList";
import {api} from "@/api";
import {
  ADD_TASKS, DELETE_PLAYER,
  MainEmitter,
  NEXT_TASK,
  NULL_ACTIVE_CARD,
  USER_PICKED_CARD
} from "@/utils/EventEmitter";

export default {
  name: "RoomPage",
  components: {TasksList, UsersList, TaskLink, PokerCards},

  data() {
    return {
      users: [],
      tasks: [],
      result: null,
    }
  },

  methods: {
    onmessage (message) {
      const {data, event} = JSON.parse(message.data);

      if (event === 'users') {
        let allPickedAreNull = true;

        this.users = new Map(data.users.map(el => {
          if (el.picked != null) {
            allPickedAreNull = false;
          }

          return [el._id, el];
        }));

        if (data.result != null) {
          this.result = data.result;
        } else {
          this.result = null;
        }

        if (allPickedAreNull) {
          this.emitter.emit(NULL_ACTIVE_CARD);
        }
      }

      if (event === 'tasks') {
        this.tasks = data.tasks;
      }
    }
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  mounted() {
    api.getUsers().then(users => {
      this.users = new Map(users.map(el => [el._id, el]));
    });

    api.getTasks().then(tasks => {
      this.tasks = tasks;
    });

    this.emitter.on(USER_PICKED_CARD, (picked, cb) => {
      const id = localStorage.getItem('userId');

      const element = this.users.get(id);
      if (element && element.picked === picked) picked = null;

      api.pickCard({id, picked}).then(cb);
    });

    this.emitter.on(ADD_TASKS, (data) => {
      if (!data) return;

      api.addTasks(data);
    });

    this.emitter.on(NEXT_TASK, (id) => {
      const promise = this.result == null
          ? api.deleteTask(id)
          : api.addTaskResult({id, result: this.result});

      Promise.all([api.nullResults(), promise])
          .then(() => this.result = null);
    });

    this.emitter.on(DELETE_PLAYER, (id) => {
      api.deletePlayer(id);
    })

    api.setupEventSource(this.onmessage);
  }
}
</script>

<style scoped>
.room-wrapper {
  display: grid;
  width: 100%;
  grid-template-areas:
      "link users"
      "cards users"
      "tasks results";
  grid-auto-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr auto;
  grid-gap: 20px;
}
</style>
