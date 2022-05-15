<template>
  <div class="users-wrapper">
    <div
        v-for="user of users.values()"
        :class="[{ready: user.picked != null}, 'name']"
        :key="user._id"
    >
      {{ user.name }}
      <span :class="[{visible: isVisible},'result']">
        {{ user.picked }}
      </span>
      <button @click="deleteUser(user._id)">X</button>
    </div>
  </div>
  <div class="results">Results:
    <div :class="{visible: isVisible}">
      {{ summarize }}
    </div>
  </div>
</template>

<script>
import {DELETE_PLAYER, MainEmitter, NULL_RESULTS, SHOW_RESULTS} from "@/utils/EventEmitter";

export default {
  name: "UsersList",
  props: ['users'],

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

  computed: {
    summarize() {
      if (!this.isVisible) return null;

      let result = 0;

      this.users.forEach(el => {
        result += el.picked;
      });

      return (result / this.users.size).toFixed(1);
    }
  },

  beforeMount() {
    this.emitter = MainEmitter;
  },

  mounted() {
    this.emitter.on(NULL_RESULTS, () => this.isVisible = false);
    this.emitter.on(SHOW_RESULTS, () => this.isVisible = true);
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
</style>
