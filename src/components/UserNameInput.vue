<template>
  <div class="input-container">
    <input v-model="value" @keydown.enter="emitName" autofocus/>
    <button @click="emitName">Submit</button>
  </div>
</template>

<script>
import {MainEmitter} from "@/App";
import {NAME_SUBMIT} from "@/utils/EventEmitter";

export default {
  name: "UserNameInput",
  data() {
    return {
      value: '',
    }
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  methods: {
    emitName() {
      if (!this.value) return;

      this.emitter.emit(NAME_SUBMIT, this.value);
    }
  },
}
</script>

<style scoped>
.input-container input{
  min-width: 200px;
}

.input-container button{
  margin-left: -1px;
  /*font: inherit;*/
  padding: 0 10px;
}
</style>
