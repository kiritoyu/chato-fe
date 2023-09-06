<template>
  <div>
    <StatusBox :file="file">
      <div
        class="img-item"
        @click="handleClickItem"
        :style="{ width: itemWidth + 'px', height: itemHeight + 'px' }"
      >
        <img class="img" :src="file.url || file.preview" @load="handleLoad" />
      </div>
    </StatusBox>
    <CropModal
      style="z-index: 99999"
      :crop-visible="cropVisible"
      :cropProps="cropProps"
      :cropUrl="cropUrl"
      @handleCropClose="handleCropClose"
      @handleCropSuccess="handleCropSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import CropModal from '@/components/ImgUpload/componets/CropModal/index.vue'
import StatusBox from '@/components/ImgUpload/componets/ImgItem/StatusBox.vue'
import type {
  imageCropProps,
  ImgVideoUploadFile,
  InjectConfig,
  SelectModalConfig
} from '@/components/ImgUpload/data'
import { ElNotification as Notification } from 'element-plus'
import { inject, ref, toRef } from 'vue'

interface Props {
  file: ImgVideoUploadFile
  itemWidth?: number
  itemHeight?: number
  cropProps?: imageCropProps
}

const {
  initConfig: { unique, maxLength }
} = inject<InjectConfig>('config')

const { setLocalFileList, localFileList } = inject<SelectModalConfig>('selectConfig')
const refLocalFileList = toRef(localFileList, 'value')

const props = defineProps<Props>()
const cropVisible = ref<boolean>(false)
const cropUrl = ref<string>()

const checkUrlUnique = (fileList: ImgVideoUploadFile[], url: string) => {
  return fileList.some((item) => item.url?.indexOf(url) !== -1)
}

const handleClickItem = () => {
  // 裁剪
  if (props.file.status !== 'success') return
  cropVisible.value = true
  cropUrl.value = props.file.url
}

// 取消裁剪
const handleCropClose = () => {
  cropVisible.value = false
}

// 裁剪成功
const handleCropSuccess = (uid: string, previewUrl: string) => {
  const newFile: ImgVideoUploadFile = {
    uid: new Date().getTime(),
    status: 'success',
    url: uid,
    thumbUrl: uid,
    preview: previewUrl,
    size: 0,
    type: 'IMAGE',
    raw: null,
    name: '',
    percentage: 100,
    response: null
  }
  console.log(maxLength, refLocalFileList.value)
  if (maxLength === 1) {
    setLocalFileList([newFile])
  } else {
    if (unique && checkUrlUnique(refLocalFileList.value, newFile.url)) {
      return Notification.error('请勿设置重复的图片')
    } else {
      const newLocalFileList = [...refLocalFileList.value, newFile]
      setLocalFileList(newLocalFileList)
    }
  }
  handleCropClose()
}

const handleLoad = () => {}
</script>

<style scoped lang="scss">
.img-item {
  width: 140px;
  height: 116px;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .error-tip {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    padding: 5px 10px;
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #eaeae8;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .size-tip {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    background-color: rgba(#000000, 0.5);
    opacity: 0;
    transition: all 0.3s;
  }
  &:hover {
    .size-tip {
      opacity: 1;
    }
  }
  .checkbox {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  .re-audit-btn {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
