<template>
  <BaseApp>
    <BaseHeader>
      <template #start>
        <BaseButtonGroup>
          <BaseButton :href="routeConst.home">Home logo</BaseButton>
        </BaseButtonGroup>
      </template>
      <div class="flex-1 flex justify-center">
        <BaseButtonGroup class="gap-1">
          <BaseButton :href="routeConst.home">Home</BaseButton>
          <BaseButton :href="routeConst.weather">Weather</BaseButton>
          <BaseButton :href="routeConst.chat">Chat</BaseButton>
        </BaseButtonGroup>
      </div>
      <template #end>
        <BaseButtonGroup>
          <BaseButton>Dropdown menu</BaseButton>
        </BaseButtonGroup>
      </template>
    </BaseHeader>
    <slot/>
  </BaseApp>
</template>
<script setup lang="ts">
</script>