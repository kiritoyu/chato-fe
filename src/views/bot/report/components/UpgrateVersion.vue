<template>
  <div class="w-full h-full flex justify-center items-center upgrate-version-container">
    <img :src="upgrateVersion" class="w-[400px] h-[200px]" alt="" />
  </div>
</template>

<script setup lang="ts">
import upgrateVersion from '@/assets/img/upgrate-version.png'
</script>

<style scoped lang="scss"></style>
