<template>
  <h1>PokerPlan</h1>
  <router-view />
</template>

<script>
// import EventEmitter from "@/utils/EventEmitter";
//
// const MainEmitter = new EventEmitter();
// export {MainEmitter};

export default {
  name: 'App',
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}
</style>
