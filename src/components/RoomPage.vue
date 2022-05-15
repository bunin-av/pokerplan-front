<template>
  <h3>Main room</h3>
  <div class="room-wrapper">
    <TaskLink :task="tasks[0] ?? {}"/>
    <PokerCards/>
    <UsersList :users="users"/>
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
  NULL_CARD,
  NULL_RESULTS,
  SHOW_RESULTS,
  USER_PICKED_CARD
} from "@/utils/EventEmitter";

export default {
  name: "RoomPage",
  components: {TasksList, UsersList, TaskLink, PokerCards},

  data() {
    return {
      users: [],
      tasks: [],
    }
  },

  methods: {
    onmessage (message) {
      const {data, event} = JSON.parse(message.data);

      if (event === 'users') {
        const result = [];
        let allPickedAreNull = true;

        this.users = new Map(data.map(el => {
          if (el.picked != null) {
            result.push(el.picked);
            allPickedAreNull = false;
          }

          return [el._id, el];
        }));

        if (result.length === this.users.size) {
          this.emitter.emit(SHOW_RESULTS);
        } else {
          this.emitter.emit(NULL_RESULTS);
        }

        if (allPickedAreNull) {
          this.emitter.emit(NULL_CARD);
        }

      }

      if (event === 'tasks') {
        this.tasks = data;
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
      Promise.all([api.nullResults(), api.deleteTask(id)])
          .then(() => this.emitter.emit(NULL_RESULTS));
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
