<template>
  <div class="page-body-container">
    <div :class="['page-center-container page-content-container', centerFull && 'h-full !pb-0']">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    centerFull?: boolean
  }>(),
  {
    centerFull: false
  }
)
</script>
