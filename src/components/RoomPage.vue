<template>
  <h3>Main room</h3>
  <div class="room-wrapper">
    <TaskLink ref="task"/>
    <PokerCards/>
    <UsersList :users="users"/>
    <TasksList/>
  </div>
</template>

<script>
import PokerCards from "@/components/Cards";
import TaskLink from "@/components/TaskLink";
import UsersList from "@/components/UsersList";
import TasksList from "@/components/TasksList";
import {api} from "@/api";
import {ADD_TASK, MainEmitter, NEXT_TASK, NULL_RESULTS, SHOW_RESULTS, USER_PICKED_CARD} from "@/utils/EventEmitter";

export default {
  name: "RoomPage",
  components: {TasksList, UsersList, TaskLink, PokerCards},

  data() {
    return {
      users: [],
    }
  },

  methods: {
    onmessage (message) {
      const {data, event} = JSON.parse(message.data);

      if (event === 'users') {
        const result = [];

        this.users = new Map(data.map(el => {
          el.picked != null && result.push(el.picked);

          return [el.name, el];
        }));

        if (result.length === this.users.size) {
          this.emitter.emit(SHOW_RESULTS);
        }
      }
      if (event === 'tasks') {
        this.$refs.task.setTask(data);
      }
    }
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  mounted() {
    api.getUsers().then(users => {
      this.users = new Map(users.map(el => [el.name, el]));
    });

    this.emitter.on(USER_PICKED_CARD, (picked, cb) => {
      const name = localStorage.getItem('userName');

      const element = this.users.get(name);
      if (element && element.picked === picked) picked = null;

      api.pickCard({name, picked}).then(cb);
    });

    this.emitter.on(ADD_TASK, (data, cb) => {
      if (!data) return;

      api.addTask(data).then(cb);
    });

    this.emitter.on(NEXT_TASK, () => {
      api.nullResults()
          .then(() => this.emitter.emit(NULL_RESULTS));
    });

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
