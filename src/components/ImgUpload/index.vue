<template>
  <div v-if="uploadType == 1" class="img-upload">
    <!-- 为什么Upload1没有采用Provide传递属性： Upload1 在其他组件中也用到了 -->
    <Upload1
      :disabled="disabled"
      :fileList="fileList"
      :curentUploadingLengthProp="curentUploadingLengthProp"
      :initConfig="initConfig"
      @handleChangeFileList="(fileList, oldFileList) => decorateSetFileList(fileList, oldFileList)"
      @handlePreview="(file) => handlePreview(file)"
      @handleRemove="(file, fileIndex) => handleRemove(file, fileIndex)"
      @handleCrop="(file, fileIndex) => handleCrop(file, fileIndex)"
      @handleMove="(file, fileIndex, order) => handleMove(file, fileIndex, order)"
    />
  </div>
  <div v-if="uploadType == 2" class="img-upload">
    <Upload2 />
  </div>
  <SelectModal v-if="albumVisible" />
  <PreviewModal
    v-model:visible="previewVisible"
    :previewMedia="previewMedia"
    @handleCloseMedia="handleClosePreview"
  />
  <CropModal
    v-if="cropVisible"
    v-model:cropVisible="cropVisible"
    :cropUrl="cropItem.url || cropItem.preview"
    :cropProps="cropProps"
    :apiUploadPath="apiUploadPath"
    @handleCropClose="() => handleCropClose()"
    @handleCropSuccess="(uid, url) => handleCropSuccess(uid, url)"
  />
</template>

<script setup lang="ts">
import { currentEnvConfig } from '@/config'
import { computed, provide, ref, watch } from 'vue'
import CropModal from './componets/CropModal/index.vue'
import PreviewModal from './componets/PreviewModal/index.vue'
import SelectModal from './componets/SelectModal/index.vue'
import Upload1 from './componets/upload1/index.vue'
import Upload2 from './componets/upload2/index.vue'
import type {
  ImgUplaodEmit,
  ImgUplaodProps,
  ImgUploadContextInitConfig,
  ImgVideoUploadFile,
  InjectConfig,
  MediaItem,
  MediaType
} from './data'
const translateMediaType = {
  'image/png': 'IMAGE',
  'image/jpg': 'IMAGE',
  'image/jpeg': 'IMAGE',
  'video/mp4': 'VIDEO'
}

const props = withDefaults(defineProps<ImgUplaodProps>(), {
  uploadType: 1,
  unique: false,
  showImage: false,
  showVideo: false,
  maxSize: 5,
  uploadBtnText: '',
  disabled: false,
  uploadFillet: false,
  apiUploadPath: currentEnvConfig.uploadBaseURL + '/chato/api/file/upload/file'
})

const emit = defineEmits<ImgUplaodEmit>()

const fileList = ref<ImgVideoUploadFile[]>([])
const previewVisible = ref<boolean>(false)
const previewMedia = ref<ImgVideoUploadFile>(null)
const cropVisible = ref(false)
const cropItem = ref<ImgVideoUploadFile>()
const cropItemIndex = ref<number>()
const albumVisible = ref<boolean>(false)
const curentUploadingLengthProp = ref(false)
// const reloadFileListLoading = ref<boolean>(false)
// const itemWidth = computed(() => (props.aspectRatio ? props.aspectRatio * 86 + 16 : undefined))

const initConfig = computed<ImgUploadContextInitConfig>(() => {
  return {
    uploadBg: props.uploadBg,
    uploadType: props.uploadType,
    unique: props.unique,
    showImage: props.showImage,
    showVideo: props.showVideo,
    uploadBtnText: props.uploadBtnText,
    maxSize: props.maxSize,
    maxLength: props.maxLength,
    disabled: props.disabled,
    itemWidth: props.itemWidth,
    itemHeight: props.itemHeight,
    apiUploadPath: props.apiUploadPath,
    cropProps: props.cropProps,
    showUploadList: props.showUploadList,
    uploadFillet: props.uploadFillet
  }
})

//  // Todo: 同时调用返回值先后顺序有点问题
// async function getPreviewUrl(file: ImgVideoUploadFile): Promise<string | any> {
//   if (file.preview) {
//     return file.preview
//   } else if (file.url && file.url.indexOf('http') !== -1) {
//     return file.url
//   } else if (file.raw) {
//     return await getFileBase64(file.raw)
//   } else {
//     return ''
//   }
// }

// async function createFileList(fileList: ImgVideoUploadFile[]) {
//   const newFileList: ImgVideoUploadFile[] = []
//   for (let i = 0; i < fileList.length; i++) {
//     if (fileList[i].url) {
//       newFileList.push(fileList[i])
//     } else {
//       newFileList.push({
//         ...fileList[i],
//         url: await getPreviewUrl(fileList[i])
//       })
//     }
//   }
//   return newFileList
// }

// 默认图片处理
const getMediaItemModelValue = (url: string | string[]): MediaItem | MediaItem[] => {
  let handleUrl: MediaItem | MediaItem[] = null
  if (Array.isArray(url)) {
    handleUrl = url.map((item) => ({ url: item, mediaType: 'IMAGE', coverUrl: item }))
  } else {
    handleUrl = { url, mediaType: 'IMAGE', coverUrl: url }
  }
  return handleUrl
}

const determineNotMediaItem = (url) => {
  if (typeof url === 'string') {
    return true
  }
  if (Array.isArray(url)) {
    return url.every((item) => typeof item === 'string')
  }
  return false
}

function setFileList(list: ImgVideoUploadFile[]) {
  fileList.value = list
}

async function reloadFileList(fileList: ImgVideoUploadFile[]) {
  // const newFileList = await createFileList(fileList)
  setFileList(fileList)
  return fileList
}

// 包装一下setFileList函数，需要触发onChange时调用 做一下图片处理
async function decorateSetFileList(
  fileList: ImgVideoUploadFile[],
  oldFileList: ImgVideoUploadFile[]
) {
  const newFileList = await reloadFileList(fileList)
  // 每次更新文件列表，只要变化就触发文件更新函数
  emit('onFileChange', [...newFileList])
  //  这里用嵌套if是为了理解简单
  if (newFileList.length === 0) {
    emit('onChange', '', fileList, oldFileList)
  } else if (props.maxLength === 1) {
    if (newFileList[0].url) {
      emit(
        'onChange',
        {
          url: newFileList[0].url!,
          mediaType:
            newFileList[0].type || (translateMediaType[newFileList[0].raw.type] as MediaType),
          coverUrl: (newFileList[0] as ImgVideoUploadFile).thumbUrl
        },
        newFileList,
        oldFileList
      )
    }
  } else {
    if (newFileList.every((item) => item.url)) {
      emit(
        'onChange',
        newFileList.map((item: ImgVideoUploadFile) => ({
          url: item.url!,
          mediaType: item.type || (translateMediaType[item.raw.type] as MediaType),
          coverUrl: item.thumbUrl
        })),
        newFileList,
        oldFileList
      )
    }
  }
}

function creatFileItem(item: MediaItem, index: number): ImgVideoUploadFile {
  const fileItem: ImgVideoUploadFile = {
    uid: Math.random() + index,
    status: 'success',
    url: item.url,
    preview: item.mediaType === 'VIDEO' ? item.coverUrl : item.url,
    thumbUrl: item.mediaType === 'VIDEO' ? item.coverUrl : item.url,
    size: 0,
    name: '',
    response: null,
    raw: null as any,
    type: item.mediaType
  }
  return fileItem
}

async function initEdit(url: '' | string | string[] | MediaItem | MediaItem[]) {
  if (Array.isArray(url) && url.length === 0) return (fileList.value = [])
  if (url) {
    let editData = null
    let fileList: ImgVideoUploadFile[] = []
    //  普通url图片模式
    if (determineNotMediaItem(url)) {
      editData = getMediaItemModelValue(url as string | string[])
    } else {
      editData = url
    }
    if (Array.isArray(editData)) {
      fileList = editData.map((item, index) => creatFileItem(item, index))
      reloadFileList(fileList)
    } else {
      fileList = [creatFileItem(editData, 0)]
      reloadFileList(fileList)
    }
  } else {
    fileList.value = []
  }
}

watch(
  () => props.value,
  (e) => {
    initEdit(e)
  },
  { deep: true, immediate: true }
)

// 预览
function handlePreview(file: ImgVideoUploadFile) {
  previewVisible.value = true
  previewMedia.value = file
}
// 关闭预览
function handleClosePreview() {
  previewVisible.value = false
}

// 删除
function handleRemove(file: ImgVideoUploadFile, fileIndex: number) {
  const nowFileList = fileList.value.filter((item, index) => fileIndex !== index)
  decorateSetFileList(nowFileList, [...fileList.value])
}

// 裁剪
function handleCrop(file: ImgVideoUploadFile, fileIndex: number) {
  cropItem.value = file
  cropItemIndex.value = fileIndex
  cropVisible.value = true
}

function handleCropClose() {
  // 特殊处理：如果maxLenth =1; fileList = 0
  props.maxLength === 1 && fileList.value.length === 0
    ? (curentUploadingLengthProp.value = !curentUploadingLengthProp.value)
    : ''
  cropVisible.value = false
}
// 裁剪成功，替换或产生新图
function handleCropSuccess(uid: string, previewUrl: string) {
  let nowFileList: ImgVideoUploadFile[] = []
  if (!props.cropProps.notSelectCrop && fileList.value.length < props.maxLength) {
    // 产生新的图
    nowFileList = [
      ...fileList.value,
      {
        ...cropItem.value!,
        name: '',
        uid: new Date().getTime(),
        status: 'success',
        url: uid,
        preview: previewUrl,
        thumbUrl: uid
      }
    ]
  } else {
    nowFileList = fileList.value.map((item, index) => {
      // 替换原来的图
      if (index == cropItemIndex.value) {
        return {
          ...item,
          url: uid,
          status: 'success',
          preview: previewUrl,
          thumbUrl: uid
        }
      } else {
        return item
      }
    })
  }
  decorateSetFileList(nowFileList, fileList.value)
  handleCropClose()
  curentUploadingLengthProp.value = !curentUploadingLengthProp.value
}

// 移动
const handleMove = (file: ImgVideoUploadFile, fileIndex: number, order: -1 | 1) => {
  if (fileList.value.length <= 1) return
  const newFileList = [...fileList.value]
  const item = newFileList[fileIndex]
  newFileList[fileIndex] = newFileList[fileIndex + order]
  newFileList[fileIndex + order] = item
  decorateSetFileList(newFileList, fileList.value)
}

const setAlbumVisible = (data: boolean) => {
  albumVisible.value = data
}

// 打开图片库需要
const provideConfig: InjectConfig = {
  fileList,
  initConfig: initConfig.value,
  handlePreview,
  handleRemove,
  handleCrop,
  handleMove,
  handleChangeAlbumVisible: setAlbumVisible,
  handleChangeFileList: decorateSetFileList
}

provide('config', provideConfig)
</script>

<style scoped lang="scss">
.img-upload {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  line-height: 1.5715;
}
</style>
