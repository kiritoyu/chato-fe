<template>
  <div class="flex flex-col flex-1 h-full">
    <el-alert
      v-if="isChrome"
      title="为保证使用体验，建议使用 Chrome 浏览器访问"
      type="warning"
      center
      @close="clickFrequency = true"
    />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import usePlatform from '@/composables/usePlatform'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

const clickFrequency = useStorage('clickFrequency', false)

const platformInfo = usePlatform()
const isChrome = computed(
  () => !platformInfo.chrome && !platformInfo.mobile && !clickFrequency.value
)
</script>
