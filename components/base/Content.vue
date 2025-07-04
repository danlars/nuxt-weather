<template>
  <main class="content content-variables">
    <slot/>
  </main>
</template>
<script setup lang="ts">
</script>
<style scoped>
@reference "../../assets/css/main.css";

.content-variables {
  --padding-top: var(--content-padding-top);
  --padding-bottom: var(--content-padding-bottom);
  --padding-start: var(--content-padding-start);
  --padding-end: var(--content-padding-end);
  --background-color: var(--content-background-color);
  --gap: var(--content-gap);
}

.content {
  @apply
    flex flex-1 flex-col gap-(--gap) contain-content pt-(--padding-top) pb-(--padding-bottom) ps-(--padding-start) pe-(--padding-end)
    bg-(--background-color) overflow-auto
  ;
}
</style>