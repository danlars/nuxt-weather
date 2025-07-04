<template>
  <div class="btn-group btn-group-variables">
    <slot/>
  </div>
</template>
<script lang="ts" setup>
provide(providerKeyConst.buttonGroupScope, true)
</script>
<style scoped>
@reference "../../assets/css/main.css";

.btn-group-variables {
  --btn-border-radius: 0;
}

.btn-group {
  @apply flex justify-evenly;
}
</style>