<template>
<div class="users-wrapper">
  <div
      v-for="user of users.values()"
      :class="{ready: user.picked != null}"
      :key="user.id"
  >
    {{ user.name }}
  </div>
</div>
</template>

<script>
export default {
  name: "UsersList",
  props: ['users'],
}
</script>

<style scoped>
.users-wrapper {
  grid-area: users;
  width: 300px;
}

.ready {
  border: forestgreen 2px solid ;
  border-radius: 5px;
}
</style>
