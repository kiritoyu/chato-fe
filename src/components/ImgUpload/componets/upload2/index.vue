<template>
  <div class="upload2-container">
    <ImgItem
      v-for="item in upFileList"
      :key="item.uid"
      :file="item"
      :fileIndex="currentIndex(item, upFileList)"
      :disabled="disabled"
      :itemWidth="itemWidth"
      :itemHeight="itemHeight"
      :showUploadList="showUploadList"
      :file-list="upFileList"
      :uploadFillet="uploadFillet"
      @onCrop="(file, index) => handleCrop(file, index)"
      @onRemove="(file, index) => handleRemove(file, index)"
      @onPreview="(file, index) => handlePreview(file)"
      @onMove="(file, index: -1 | 1) => handleMove(file, currentIndex(file, upFileList), index)"
    />
    <UploadBtn
      v-if="upFileList.length < maxLength"
      :uploadType="2"
      :text="uploadBtnText"
      :uploadFillet="uploadFillet"
      :disabled="disabled"
      :itemWidth="itemWidth"
      :itemHeight="itemHeight"
      @handleChangeAlbumVisible="handleChangeAlbumVisible"
    />
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus'
import { inject, toRef, watch } from 'vue'
import type { ImgVideoUploadFile, InjectConfig } from '../../data'
import ImgItem from '../ImgItem/index.vue'
import UploadBtn from '../UploadBtn/index.vue'

const {
  fileList,
  initConfig: {
    maxLength,
    itemWidth,
    itemHeight,
    showUploadList,
    disabled,
    uploadBtnText,
    uploadFillet
  },
  handlePreview,
  handleRemove,
  handleCrop,
  handleMove,
  handleChangeAlbumVisible
} = inject<InjectConfig>('config')
const upFileList = toRef(fileList, 'value')

const currentIndex = (file: UploadFile, list: ImgVideoUploadFile[]): number => {
  const index = list.findIndex((item) => item.uid === file.uid)
  return index > 0 ? index : 0
}

watch(
  upFileList,
  (n) => {
    console.log(n)
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.upload2-container {
  @apply flex items-center justify-start;
  justify-content: flex-start;
}
</style>
