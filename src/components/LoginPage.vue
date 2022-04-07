<template>
  <div class="input-wrapper">
    <h2>Hello, user!</h2>
    <div class="input-container">
      <span>Enter your name</span>
      <UserNameInput/>
    </div>
  </div>
</template>

<script>
import {MainEmitter} from "@/App";
import {api} from "@/api";
import UserNameInput from "@/components/UserNameInput";
import {NAME_SUBMIT} from "@/utils/EventEmitter";


export default {
  name: "LoginPage",
  components: {UserNameInput},

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
