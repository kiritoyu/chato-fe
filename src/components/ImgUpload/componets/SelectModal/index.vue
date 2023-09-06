<template>
  <div class="img-upload-modal-mask">
    <div class="img-upload-modal">
      <Content />
      <Footer :localFileList="localFileList" @setLocalFileList="setLocalFileList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, provide, ref, toRef, watch } from 'vue'
import type { ImgVideoUploadFile, InjectConfig } from '../../data'
import Content from './components/content/index.vue'
import Footer from './components/footer/index.vue'

const { fileList } = inject<InjectConfig>('config')
const fileListProps = toRef(fileList, 'value')

const localFileList = ref<ImgVideoUploadFile[]>(fileListProps.value || [])

const setLocalFileList = (fileList: ImgVideoUploadFile[]) => {
  console.log(fileList)
  localFileList.value = fileList
}

provide('selectConfig', {
  setLocalFileList: setLocalFileList,
  localFileList
})

watch(
  fileListProps,
  (n) => {
    console.log(n)
    localFileList.value = n || []
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.img-upload-modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  .img-upload-modal {
    overflow: hidden;
    position: absolute;
    width: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
  }
}
</style>
