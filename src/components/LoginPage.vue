<template>
  <div class="input-wrapper">
    <h2>Hello, user!</h2>
    <button @click="startNewGame">New Game</button>
    <div class="input-container">
      <span>Enter your name</span>
      <UserNameInput/>
    </div>
    <br/>
    <br/>
    <button @click="enterAsSpectator">Enter as spectator</button>
  </div>
</template>

<script>
import {api} from "@/api";
import UserNameInput from "@/components/UserNameInput";
import {MainEmitter, NAME_SUBMIT} from "@/utils/EventEmitter";


export default {
  name: "LoginPage",
  components: {UserNameInput},

  methods: {
    startNewGame() {
      api.startNewGame().then(res => {
        alert(res);
      });
    },

    enterAsSpectator() {
      window.location.pathname ='/room';
    }
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  mounted() {
    this.emitter.on(NAME_SUBMIT, (data) => {
      api.logIn(data).then(user => {
        localStorage.setItem('userName', user.name);
        window.location.pathname ='/room';
        this.$router.push('/room');
      });
    });
  },
}
</script>

<style scoped>
.input-wrapper {
  margin-top: 100px;
}

.input-container {
  display: flex;
  justify-content: center;
}

.input-container span {
  margin-right: 20px;
}
</style>
