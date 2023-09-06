<template>
  <Modal
    width="50%"
    title="预览图片"
    :footer="false"
    :close-on-click-mask="true"
    :close-on-press-escape="true"
    v-model:visible="internalVisible"
    @cancel="emit('handleCloseMedia')"
  >
    <img
      v-if="previewMedia.type === 'IMAGE'"
      :src="previewMedia.url"
      class="preview-media"
      alt="logo"
    />
    <video
      v-if="previewMedia.type === 'VIDEO'"
      class="preview-media"
      :src="previewMedia.url"
    ></video>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/index.vue'
import { computed } from 'vue'
import type { ImgVideoUploadFile } from '../../data'

interface Props {
  visible: boolean
  previewMedia: ImgVideoUploadFile
}

const emit = defineEmits(['handleCloseMedia', 'update:visible'])

const props = defineProps<Props>()

const internalVisible = computed({
  get: () => props.visible,
  set: (v) => emit('update:visible', v)
})
</script>

<style scoped lang="scss">
.preview-media {
  width: 100%;
}
</style>
