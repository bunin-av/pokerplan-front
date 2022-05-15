<template>
  <div class="tasks-wrapper">
    <div>Tasks list</div>
    <div class="button-input-wrapper">
      <button @click="nextTask">Next task</button>
      <textarea v-model="value" @keydown.enter.exact="addTasks" placeholder="Enter tasks links"/>
    </div>
    <div class="link">
    </div>
    <div v-for="task of tasks" :key="task._id" class="tasks-list">
      {{ task.link }}
    </div>
  </div>
</template>

<script>
import {ADD_TASKS, MainEmitter, NEXT_TASK} from "@/utils/EventEmitter";

export default {
  name: "TasksList",
  props: ['tasks'],
  data() {
    return {
      value: '',
      link: '',
    }
  },

  methods: {
    addTasks() {
      let separator;
      const
          tasks = [],
          value = this.value.trim();

      if (value.includes(' ')) separator = ' ';
      if (value.includes('\n')) separator = '\n';

      separator
          ? tasks.unshift(...value.split(separator))
          : tasks.unshift(value);

      this.value = '';
      this.emitter.emit(ADD_TASKS, tasks);
    },

    nextTask() {
      this.emitter.emit(NEXT_TASK, this.tasks[0]._id);
    }
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  }
}
</script>

<style scoped>
.tasks-wrapper {
  grid-area: tasks;
  text-align: left;
}

.button-input-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.button-input-wrapper > textarea {
  width: 100%;
}

.tasks-list {
  width: 100%;
}
</style>
