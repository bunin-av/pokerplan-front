<template>
  <div class="users-wrapper">
    <div
        v-for="user of users.values()"
        :class="[{ready: user.picked != null}, 'name']"
        :key="user.id"
    >
      {{ user.name }}
      <span :class="[{visible: isVisible},'result']">
        {{ user.picked }}
      </span>
    </div>
  </div>
</template>

<script>
import {MainEmitter} from "@/App";
import {NULL_RESULTS, SHOW_RESULTS} from "@/utils/EventEmitter";

export default {
  name: "UsersList",
  props: ['users'],

  data() {
    return {
      isVisible: false,
    }
  },

  methods: {
    // addClass() {
    //   // const elems = this.$el.querySelectorAll('.result');
    //   // elems.forEach(el => el.classList.add('_visible'));
    //   // setTimeout(() => {
    //   //   elems.forEach(el => el.classList.toggle('_visible'));
    //   // }, 5000);
    //
    // },

    removeResults() {
      const results = this.$el.querySelectorAll('.visible');
      const users = this.$el.querySelectorAll('.ready');
      //
      results.forEach(el => el.classList.remove('visible'));
      users.forEach(el => el.classList.remove('ready'));

      this.isVisible = false;
    },

    showResults() {
      this.isVisible = true;
    }
  },

  beforeMount() {
    this.emitter = MainEmitter;
  },

  mounted() {
    this.emitter.on(NULL_RESULTS, this.removeResults);
    this.emitter.on(SHOW_RESULTS, this.showResults);
  }
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
</style>
