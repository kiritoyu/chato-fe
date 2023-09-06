<template>
  <header :class="['flex justify-center', title ? 'mt-10 mb-8 lg:my-4' : 'h-16']">
    <div class="page-center-container flex gap-2 items-center">
      <span
        v-show="isMobile"
        @click="drawerVisible = true"
        class="inline-block w-fit cursor-pointer rounded-full"
      >
        <svg-icon name="menu-more" svg-class="w-10 h-10 text-[#303133] mt-1"></svg-icon>
      </span>
      <h3 v-if="title" class="text-[#303133] font-medium text-xl">{{ title }}</h3>
      <slot></slot>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useBasicLayout } from '@/composables/useBasicLayout'
import useSidebar from '@/composables/useSidebar'

defineProps<{
  title?: string
}>()

const { isMobile } = useBasicLayout()
const { drawerVisible } = useSidebar()
</script>
