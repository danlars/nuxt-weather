<template>
  <header :class="classes">
    <div class="flex">
      <slot name="start"/>
    </div>
    <div class="flex flex-1">
      <slot/>
    </div>
    <div class="flex">
      <slot name="end"/>
    </div>
  </header>
</template>
<script lang="ts" setup>
import type {colorNameType} from "~/types/colorName.type";

const props = defineProps({
  color: {
    type: String as PropType<colorNameType>,
    default: 'primary',
    validator: (value: string) => Object.keys(colorClassConst).includes(value),
  },
});

const classes = computed(() => {
  const classNames = ['header-variables', 'header'];
  if (props.color) {
    classNames.push('color', colorClassName(props.color));
  }
  return classNames;
})
</script>
<style scoped>
@reference "../../assets/css/main.css";

.header-variables {
  --background-color: var(--header-background-color);
  --color:  var(--header-color);
  --min-height: var(--header-min-height);
}

.header {
  box-shadow: 0 10px 6px rgba(0, 0, 0, 0.05);
  @apply flex items-stretch bg-(--background-color) text-(--color) min-h-(--min-height);
}

.color {
  --color: var(--color-contrast);
  --background-color: var(--color-base);
}
</style>