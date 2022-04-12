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

export default {
  name: "TaskLink",

  data: () => ({task: ''}),

  methods: {
    setTask(task) {
      this.task = task;
    }
  }
}
</script>

<style scoped>
.link-wrapper {
  grid-area: link;
  display: flex;
  flex-direction: column;
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
