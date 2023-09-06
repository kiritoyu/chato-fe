<template>
  <div
    v-loading="audioLoading"
    class="flex justify-start items-center py-2 rounded w-[83px] pl-[5px] chat-message-audio cursor-pointer"
    @click="emit('handleAudio', isPlaying)"
  >
    <svg-icon :name="isPlaying ? 'audio-play' : 'audio-pause'" class="w-[16px] h-[16px] mr-[8px]" />
    <img
      v-if="!isPlaying"
      class="!w-[46px] !h-[16px] !mb-[0] !bg-[#F2F3F5] !mr-0"
      :src="WaveAduioPause"
      alt=""
    />
    <img
      v-else
      class="!w-[46px] !h-[16px] !bg-[#F2F3F5] !mb-[0] !mr-0"
      :src="WaveAudioPlay"
      alt="audio"
    />
  </div>
</template>

<script setup lang="ts">
import WaveAduioPause from '@/assets/img/message/wave-audio-pause.png'
import WaveAudioPlay from '@/assets/img/message/wave-audio-play.gif'

defineProps<{
  isPlaying: boolean
  audioLoading: boolean
}>()

const emit = defineEmits(['handleAudio'])
</script>

<style scoped lang="scss">
.chat-message-audio {
  :deep(.el-loading-mask) {
    border-radius: 8px;
  }
  :deep(.el-loading-spinner) {
    .circular {
      width: 20px !important;
    }
  }
}
</style>
