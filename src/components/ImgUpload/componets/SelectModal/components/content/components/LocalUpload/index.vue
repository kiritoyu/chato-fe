<template>
  <div class="local-uplaod">
    <div class="line">
      <ImgItemSelect
        v-for="_item in fileList"
        :key="_item.uid"
        :file="_item"
        :itemWidth="102"
        :itemHeight="102"
        :cropProps="cropProps"
      />
      <Upload1
        :fileList="fileList"
        :initConfig="resetInitConfig"
        @handleChangeFileList="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Upload1 from '@/components/ImgUpload/componets/upload1/index.vue'
import type { ImgVideoUploadFile, InjectConfig } from '@/components/ImgUpload/data'
import { inject, ref } from 'vue'
import ImgItemSelect from '../ImgItemSelect/index.vue'

const {
  initConfig: { maxSize, uploadBtnText, cropProps, apiUploadPath }
} = inject<InjectConfig>('config')

const fileList = ref<ImgVideoUploadFile[]>([])

const resetInitConfig = {
  unique: false,
  maxSize,
  uploadBtnText,
  itemWidth: 102,
  itemHeight: 102,
  maxLength: 1000,
  disabled: false,
  cropProps: {
    ...cropProps,
    notSelectCrop: true
  },
  itemRender: false,
  apiUploadPath
}

const handleChange = (newFileList: ImgVideoUploadFile[]) => {
  fileList.value = newFileList
  // Todo： 用户上传后的图片添加到我的图库
}
</script>

<style scoped lang="scss">
.local-uplaod {
  height: 315px;
  overflow-y: scroll;
  :deep(.el-upload-list__item) {
    display: none;
  }
  .line {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
.tip {
  font-size: 14px;
  color: #666666;
  transform: translateY(-10px);
}
</style>
