<template>
  <div class="link-wrapper">
    <input v-model="value" @keydown="onEnterPress" placeholder="Enter task link">
    <div class="link">
      <a target="_blank" :href="link">
        {{ link }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskLink",
  data() {
    return {
      value: '',
      link: '',
    }
  },

  methods: {
    onEnterPress({key}) {
      if (key === 'Enter') {
        this.link = this.value;
        this.value = '';
      }
    }
  }
}
</script>

<style scoped>
.link-wrapper {
  grid-area: link;
  display: flex;
  flex-direction: column;
  /*margin: 0 auto;*/
}

.link-wrapper input {
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
