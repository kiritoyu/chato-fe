<template>
  <div
    :class="['w-10 h-10 lg:w-8 lg:h-8 rounded-full overflow-hidden shrink-0', internalSizeClass]"
  >
    <img v-if="internalUser?.avatar" class="w-full h-full" :src="internalUser?.avatar" alt="头像" />
    <div
      v-else
      class="bg-[#7C5CFC] text-xl text-white flex items-center justify-center w-full h-full"
      :style="`font-size: ${textSize || 20}px;`"
    >
      {{ internalUser?.nickname[0] || '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserInfo } from '@/interface/user'
import { computed } from 'vue'

const props = defineProps<{
  user: IUserInfo
  size?: number
  textSize?: number
}>()

const internalUser = computed(() => props.user)
const internalSizeClass = computed(() => {
  if (!props.size) {
    return ''
  }

  const tSize = Math.floor(props.size / 4)
  const tLgSize = tSize - 2 || tSize
  return `w-${tSize} h-${tSize} lg:w-${tLgSize} lg:h-${tLgSize}`
})
</script>
