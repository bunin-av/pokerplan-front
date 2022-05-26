<template>
  <div class="users-wrapper">
    <div
        v-for="user of users.values()"
        :class="[{ready: user.picked != null}, 'name']"
        :key="user._id"
    >
      {{ user.name }}

      <div class="wrapper">
        <span :class="[{visible: !!result},'result']">
          {{ user.picked }}
        </span>
        <button @click="deleteUser(user._id)" class="delete-button">X</button>
      </div>
    </div>
  </div>
  <div class="results">
    Results:
    <div>
      {{ result }}
    </div>
  </div>
</template>

<script>
import {DELETE_PLAYER, MainEmitter, } from "@/utils/EventEmitter";

export default {
  name: "UsersList",
  props: ['users', 'result'],

  data() {
    return {
      isVisible: false,
    }
  },

  methods: {
    deleteUser(id) {
      this.emitter.emit(DELETE_PLAYER, id);
    }
  },

  beforeMount() {
    this.emitter = MainEmitter;
  },
}

</script>

<style scoped>
.users-wrapper {
  grid-area: users;
  width: 300px;
}

.name {
  height: 30px;
  margin: 3px 0;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border: 1px solid white;
  padding: 0 10px;
}

.ready {
  border: forestgreen 1px solid;
  border-radius: 5px;
}

.result {
  font-size: 1.5em;
  visibility: hidden;
  width: 30px;
}

.visible {
  visibility: visible;
}

.results {
  height: 20px;
  font-size: 1.5em;
  grid-area: results;
}

.wrapper {
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
}

.delete-button {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 0.6rem;
  opacity: 0.5;
  border-bottom-width: 1px;
}
</style>
