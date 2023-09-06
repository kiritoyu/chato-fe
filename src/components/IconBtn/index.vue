<template>
  <div
    class="cursor-pointer flex gap-1 text-xs items-center text-[#B5BED0] hover:text-[#7C5CFC]"
    @click.stop="() => emit('click')"
  >
    <svg-icon v-if="name" :name="name" class="w-4 h-4"></svg-icon>
    <component v-else :is="icon" class="w-4 h-4"></component>
    <span class="whitespace-nowrap"><slot></slot></span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  icon?: Component
  name?: string
}>()

const emit = defineEmits(['click'])
</script>
