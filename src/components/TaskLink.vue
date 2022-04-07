<template>
  <div class="link-wrapper">
    <div class="link">
      <a target="_blank" :href="task">
        {{ task }}
      </a>
    </div>
  </div>
</template>

<script>
// import {MainEmitter} from "@/App";
// import {CHANGE_LINK} from "@/utils/EventEmitter";

export default {
  name: "TaskLink",
  props: ['task'],

  // data() {
  //   return {
  //     link: '',
  //   }
  // },

 // beforeCreate() {
 //    this.emitter = MainEmitter;
 // },

  // mounted() {
  //   this.emitter.on(CHANGE_LINK, (link) => this.link = link);
  // }
}
</script>

<style scoped>
.link-wrapper {
  grid-area: link;
  display: flex;
  flex-direction: column;
  /*margin: 0 auto;*/
  width: 100%;
  padding: 5px 10px;
  margin-right: auto;
}

.link {
  background: #486d8b;
  height: 50px;
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.link a {
  color: white;
}
</style>
