<template>
  <div class="card-wrapper">
    <div class="card-container">
      <div
          v-for="el of cardValues"
          :class="[{active: activeCard === el}, 'card']"
          @click="pickCard(el)"
          :key="el">
        {{ el }}
      </div>
    </div>
  </div>
</template>

<script>
import {MainEmitter, NULL_ACTIVE_CARD, USER_PICKED_CARD} from "@/utils/EventEmitter";

export default {
  name: "PokerCards",
  data() {
    return {
      cardValues: [1, 2, 3, 5, 8],
      activeCard: null,
    }
  },

  methods: {
    pickCard(card) {
      this.emitter.emit(USER_PICKED_CARD, card, ({picked}) => this.activeCard = picked);
    },
  },

  beforeCreate() {
    this.emitter = MainEmitter;
  },

  mounted() {
    this.emitter.on(NULL_ACTIVE_CARD, () => this.activeCard = null);
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
  background: #015b99;
}

.card-wrapper {
  grid-area: cards;
}

.card-container {
  display: flex;
  gap: 20px;
}
</style>
