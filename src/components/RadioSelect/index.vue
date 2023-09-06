<template>
  <span :class="['type-radio transition-colors', internalActive && 'type-active']"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  active: boolean
}>()

const internalActive = computed(() => props.active)
</script>

<style lang="scss" scoped>
.type-radio {
  display: inline-block;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  margin-left: 8px;
  border-radius: 100%;
  border: 1px solid #dcdfe6;
}

.type-active {
  position: relative;
  background: #7c5cfc;
  border: none;
  &::after {
    position: absolute;
    left: 50%;
    bottom: 50%;
    display: inline-block;
    content: '';
    width: 7px;
    height: 3px;
    transform: rotate(-55deg) translate(calc(-50% + 1px), calc(-50%));
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
}
</style>
