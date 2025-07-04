<template>
  <component :is="elementTag" v-bind="attributes" :class="classes">
    <slot/>
  </component>
</template>
<script setup lang="ts">
import {NuxtLink} from '#components';

import type {colorNameType} from "~/types/colorName.type";
const buttonGroupScope = inject(providerKeyConst.buttonGroupScope, false);
const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
  },
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => ['sm', 'default', 'lg'].includes(value),
  },
  color: {
    type: String as PropType<colorNameType>,
    default: 'primary',
    validator: (value: string) => Object.keys(colorClassConst).includes(value),
  },
  fill: {
    type: String as PropType<'solid' | 'outline' | 'clear'>,
    default: 'solid',
    validator: (value: string) => ['solid', 'outline', 'clear'].includes(value),
  },
  href: {
    type: String,
    required: false,
    default: '',
  },
  target: {
    type: String,
    required: false,
    default: '',
  }
});
const elementTag = computed(() => props.href ? NuxtLink : 'button');
const attributes = computed(() => {
  const attrs: Record<string, string> = {};
  if (props.href) {
    attrs.to = props.href;
    attrs.target = props.target;
  }

  if (elementTag.value === 'button') {
    attrs.type = props.type;
  }

  return attrs;
})
const classes = computed(() => {
  const classList = ['btn', 'btn-variables', `btn-${props.fill}`];
  if (props.color) {
    classList.push('btn-color', colorClassName(props.color));
  }
  if (buttonGroupScope) {
    classList.push('flex-1');
  }
  if (props.size) {
    classList.push(`btn-${props.size}`);
  }

  return classList;
})
</script>
<style scoped>
@reference "../../assets/css/main.css";

.btn-variables {
  --border-radius: var(--btn-border-radius);
  --padding-top: var(--btn-padding-top);
  --padding-bottom: var(--btn-padding-bottom);
  --padding-start: var(--btn-padding-start);
  --padding-end: var(--btn-padding-end);
  --border-width: var(--btn-border-width);
  --font-size: var(--btn-font-size);

  --color: var(--btn-color);
  --background-color: var(--btn-background-color);
  --border-color: var(--btn-border-color);
  --background-opacity: 100%;

  --focus-color: var(--btn-focus-color);
  --focus-background-color: var(--btn-focus-background-color);
  --focus-border-color: var(--btn-focus-border-color);
  --focus-background-opacity: 100%;

  --hover-color: var(--btn-hover-color);
  --hover-background-color: var(--btn-hover-background-color);
  --hover-border-color: var(--btn-hover-border-color);
  --hover-background-opacity: 100%;
}

.btn {
  border-style: solid;
  border-width: var(--border-width);
  font-size: var(--font-size);

  @apply pt-(--padding-top) pb-(--padding-bottom) ps-(--padding-start) pe-(--padding-end)
  flex items-center justify-center cursor-pointer outline-0 rounded-(--border-radius)
  text-(--color) bg-(--background-color)/(--background-opacity) border-(--border-color)
  hover:not-disabled:text-(--hover-color) hover:not-disabled:bg-(--hover-background-color)/(--hover-background-opacity) hover:not-disabled:border-(--hover-border-color)
  focus:not-disabled:text-(--focus-color) focus:not-disabled:bg-(--focus-background-color)/(--focus-background-opacity) focus:not-disabled:border-(--focus-border-color)
  disabled:cursor-not-allowed disabled:opacity-50;
}

.btn-sm {
  --padding-top: var(--btn-sm-padding-top);
  --padding-bottom: var(--btn-sm-padding-bottom);
  --padding-start: var(--btn-sm-padding-start);
  --padding-end: var(--btn-sm-padding-end);
  --border-width: var(--btn-sm-border-width);
  --font-size: var(--btn-sm-font-size);
}

.btn-lg {
  --padding-top: var(--btn-lg-padding-top);
  --padding-bottom: var(--btn-lg-padding-bottom);
  --padding-start: var(--btn-lg-padding-start);
  --padding-end: var(--btn-lg-padding-end);
  --border-width: var(--btn-lg-border-width);
  --font-size: var(--btn-lg-font-size);
}

.btn-color {
  --color: var(--color-contrast);
  --background-color: var(--color-base);
  --border-color: var(--color-base);

  --focus-color: var(--color-contrast);
  --focus-background-color: var(--color-shade);
  --focus-border-color: var(--color-shade);

  --hover-color: var(--color-contrast);
  --hover-background-color: var(--color-tint);
  --hover-border-color: var(--color-tint);
}

.btn-solid {
  --color: var(--color-primary-contrast);
  --background-color: var(--color-primary);
  --border-color: var(--color-primary);

  --focus-color: var(--color-primary-contrast);
  --focus-background-color: var(--color-primary-shade);
  --focus-border-color: var(--color-primary-shade);

  --hover-color: var(--color-primary-contrast);
  --hover-background-color: var(--color-primary-tint);
  --hover-border-color: var(--color-primary-tint);
}

.btn-outline {
  --color: var(--color-primary);
  --background-color: var(--color-primary);
  --border-color: var(--color-primary);
  --background-opacity: 0;

  --focus-color: var(--color-primary-shade);
  --focus-background-color: var(--color-primary-shade);
  --focus-border-color: var(--color-primary-shade);
  --focus-background-opacity: 9%;

  --hover-color: var(--color-primary-tint);
  --hover-background-color: var(--color-primary-tint);
  --hover-border-color: var(--color-primary-tint);
  --hover-background-opacity: 9%;
}

.btn-clear {
  --color: var(--color-primary);
  --background-color: var(--color-primary);
  --border-color: transparent;
  --background-opacity: 0;

  --focus-color: var(--color-primary-shade);
  --focus-background-color: var(--color-primary-shade);
  --focus-border-color: transparent;
  --focus-background-opacity: 9%;

  --hover-color: var(--color-primary-tint);
  --hover-background-color: var(--color-primary-tint);
  --hover-border-color: transparent;
  --hover-background-opacity: 9%;
}

.btn-color.btn-solid {
  --color: var(--color-contrast);
  --background-color: var(--color-base);
  --border-color: var(--color-base);

  --focus-color: var(--color-contrast);
  --focus-background-color: var(--color-shade);
  --focus-border-color: var(--color-shade);

  --hover-color: var(--color-contrast);
  --hover-background-color: var(--color-tint);
  --hover-border-color: var(--color-tint);
}

.btn-color.btn-outline {
  --color: var(--color-base);
  --background-color: var(--color-base);
  --border-color: var(--color-base);

  --focus-color: var(--color-shade);
  --focus-background-color: var(--color-shade);
  --focus-border-color: var(--color-shade);

  --hover-color: var(--color-tint);
  --hover-background-color: var(--color-tint);
  --hover-border-color: var(--color-tint);
}

.btn-color.btn-clear {
  --color: var(--color-base);
  --background-color: var(--color-base);
  --border-color: transparent;

  --focus-color: var(--color-shade);
  --focus-background-color: var(--color-shade);
  --focus-border-color: transparent;

  --hover-color: var(--color-tint);
  --hover-background-color: var(--color-tint);
  --hover-border-color: transparent;
}
</style>