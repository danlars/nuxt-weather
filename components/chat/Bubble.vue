<template>
  <div :class="classes">
    <slot/>
  </div>
</template>
<script setup lang="ts">
import type {colorNameType} from "~/types/colorName.type";

const props = defineProps({
  color: {
    type: String as PropType<colorNameType>,
    default: 'primary',
    validator: (value: string) => Object.keys(colorClassConst).includes(value),
  },
})
const classes = computed(() => {
  const classList = ['chat-bubble', 'chat-bubble-variables'];
  if (props.color) {
    classList.push('color', colorClassName(props.color));
  }
  return classList;
})
</script>
<style scoped>
@reference "../../assets/css/main.css";

.chat-bubble-variables {
  --padding-top: var(--chat-bubble-padding-top);
  --padding-bottom: var(--chat-bubble-padding-bottom);
  --padding-start: var(--chat-bubble-padding-start);
  --padding-end: var(--chat-bubble-padding-end);
  --background-color: var(--chat-bubble-background-color);
  --color: var(--chat-bubble-color);
}

.chat-bubble {
  @apply
  pt-(--padding-top) pb-(--padding-bottom) ps-(--padding-start) pe-(--padding-end)
  rounded-lg bg-(--background-color) text-(--color)
  ;
}

.color {
  --background-color: var(--color-shade);
  --color: var(--color-contrast);
}
</style>