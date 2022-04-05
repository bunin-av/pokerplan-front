<template>
  <div class="card-wrapper">
    <div class="card-container">
      <div
          v-for="el of cardValues"
          :class="[{active: activeEl === el}, 'card']"
          @click="pickCard(el)"
          :key="el">
        {{ el }}
      </div>
    </div>
  </div>
</template>

<script>
import {MainEmitter} from "@/App";

export default {
  name: "PokerCards",
  data() {
    return {
      cardValues: [1, 2, 3, 5, 8],
      activeEl: null,
    }
  },

  methods: {
    pickCard(card) {
      this.emitter.emit('user-picked-card', card);
    },
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  mounted() {
    this.emitter.on('card-send', ({picked}) => {
      this.activeEl = picked;
    });
  }
}
</script>

<style scoped>
.card {
  width: 130px;
  height: 200px;
  background: cornflowerblue;
  color: white;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 10px;
  cursor: pointer;
}

.card:hover, .active {
  background: dodgerblue;
}

.card-wrapper {
  grid-area: cards;
}

.card-container {
  display: flex;
  gap: 20px;
}
</style>
