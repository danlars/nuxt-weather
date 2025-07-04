<template>
  <div class="app"><slot/></div>
</template>
<style scoped>
@reference "../../assets/css/main.css";

.app {
  @apply absolute inset-0 flex flex-col contain-content;
}
</style>