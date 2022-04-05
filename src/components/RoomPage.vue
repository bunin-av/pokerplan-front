<template>
  <h3>Main room</h3>
  <div class="room-wrapper">
    <TaskLink/>
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
import {MainEmitter} from "@/App";
import {api} from "@/api";

export default {
  name: "RoomPage",
  components: {TasksList, UsersList, TaskLink, PokerCards},

  data() {
    return {
      users: [],
    }
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  mounted() {
    api.getUsers().then(users => {
      this.users = new Map(users.map(el => [el.name, el]));
    });

    this.emitter.on('user-picked-card', picked => {
      const name = localStorage.getItem('userName');

      const element = this.users.get(name);

      if (element && element.picked === picked) picked = null;

      api.pickCard({name, picked}).then(user => {

        this.users.set(user.name, user)

        this.emitter.emit('card-send', user);
      });
    });
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
      "tasks users";
  grid-auto-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  grid-gap: 20px;
}


</style>
