<template>
  <div class="modal-footer">
    <div class="tip">
      你一共选择了 <span class="num">{{ localFileList.length }}</span> 张图片
      <span class="ps"
        >（最多可添加 <span>{{ maxLength }}</span> 张照片）</span
      >
    </div>
    <div class="line">
      <div class="item-box">
        <div
          class="item"
          v-for="(item, index) in localFileList"
          dragStart
          @drop="(e) => handleDrop(e, index)"
          @dragover="OnDragOver"
          @doubleClick="() => handleDoubleClick(item)"
          @dragstart="(e) => onDragStart(e, index)"
          :key="item.uid"
        >
          <img :src="item.url" class="img" alt="" />
          <div class="delete" @click="() => handleDel(index)">
            <el-icon :size="20"><Delete /></el-icon>
          </div>
        </div>
        <div class="empty" v-for="(_emptyItem, index) in emptyFileList" :key="index">
          <el-icon :size="20"><Plus /></el-icon>
        </div>
      </div>
      <el-button type="primary" :disabled="localFileList.length === 0" @click="handleClickOk"
        >确认</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImgVideoUploadFile, InjectConfig } from '@/components/ImgUpload/data'
import { computed, inject, toRef } from 'vue'

const {
  fileList,
  initConfig: { maxLength },
  handlePreview,
  handleChangeFileList,
  handleChangeAlbumVisible
} = inject<InjectConfig>('config')
const fileListProps = toRef(fileList, 'value')

const props = defineProps<{
  localFileList: ImgVideoUploadFile[]
}>()
const emptyFileList = computed(() => {
  return Array.from({ length: maxLength - props.localFileList.length })
})

const emit = defineEmits<{
  (e: 'setLocalFileList', fileList: ImgVideoUploadFile[]): void
}>()

const handleClickOk = () => {
  handleChangeFileList([...props.localFileList], fileListProps.value)
  handleChangeAlbumVisible(false)
}

const handleDel = (fileIndex: number) => {
  console.log('setLocalFileList')
  emit(
    'setLocalFileList',
    props.localFileList.filter((_item, index) => index !== fileIndex)
  )
}

const onDragStart = (e: DragEvent, index: number) => {
  e.dataTransfer.setData('json', `${index}`)
}

const OnDragOver = (e: DragEvent) => {
  e.preventDefault() // 阻止dragover默认事件，确保可以触发drop
}

const handleDrop = (e: DragEvent, index: number) => {
  e.preventDefault()
  const newLocalFileList = [...props.localFileList]
  const startIndex = Number(e.dataTransfer.getData('json'))
  const current = newLocalFileList[startIndex]
  newLocalFileList[startIndex] = newLocalFileList[index]
  newLocalFileList[index] = current
  emit('setLocalFileList', newLocalFileList)
}

const handleDoubleClick = (item: ImgVideoUploadFile) => {
  handlePreview(item)
}
</script>

<style scoped lang="scss">
.modal-footer {
  padding: 10px 40px 16px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.14);
  .tip {
    margin-bottom: 10px;
    font-size: 14px;
    color: #333333;
    .num {
      color: #096dd9;
    }
    .ps {
      font-size: 12px;
      color: #666666;
    }
  }
  .line {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .item-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 700px;
      overflow-x: auto;
      .item {
        position: relative;
        .img {
          width: 100%;
          height: 100%;
        }
        .play-icon {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAMAAAC4uKf/AAAAqFBMVEUAAAAAAAAAAAAAAAAAAAAAAAC/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v4+PhtbW01NTXu7u7n5+coKCj////JycnFxcWhoaGZmZmTk5NgYGBCQkL19fXr6+vk5OTi4uLR0dHNzc24uLipqal6enpUVFQhISHY2NjW1taKior////luF/rAAAAN3RSTlOAAAN8eGTMCls1D0tDKIJwamBXUEhGPyMeG/r4oo7v6Yr+0s+7trOckvXs5uTY1ce+qJiJ3NyvtZcixAAAAsVJREFUaN7VmolS2zAQhv/owJZs5z4JN4VytLT0yvu/WTMpIJgA0a6Omu8FvpkdWdbu/ugQsDNTlbrfU1KqXl+XlZnZDgFfmZhPBxKvIAfTuYgpK0yp8A6qNEUcmWiGEjuRw0YEy4pawRNVF0EyO5YgIMeWLSsqCSKyKlgyYRQYKCPosoUGE70gysQEAUwERWY1gtDWX9YoBKIaX1mNCNReMjFCFEZit0yUiEQpdskKjWjo4n2Z0IiIFlsySg35ldyWjRCZ0duyGtGp35I1SEDzuswqJEBZZwD9IPKPpJNNkIjJtmyBZCycjFhEfiGdzCAh5qWsUEiIKl7IKiSlei6zEkmR9plsjMSMnayQSIwsnmQ1klM/yoRCcpR4kDXIQPMgGyIDw42MfDz4RwT+N9XJ+fXy7ApczEZWwovu8WrN/vcueJRrmfdZ/LP6x9EB+zyiM4cf31aPfD0Eh/laNoUfe6sn9j9xajldywb+MscNo5aDtUxSZI4zci1lBxYkmWNJrqXFjCpzHH8GiRkMXeY4PwEBg4ohcywv4E+FkiVz3PrXsoTmyRynez/hh0afK3NcX8KLPnp8mePLD3jQgwqQOfZ9bhQFGSJzHHl84TJQ5rjykal8MoVeHNmt1wHpR5EdHXodfU2V8b9rTb2u+F8ZUKIKlS0v/S9iEyY7JfxlDP3nyf9/zqjPAv7fDLDoSLbs7AQUJPkp5zg+AI0B/ZHq3qmcR+qcI7s75D2/hSLLbg64jUWnpDQW/K6ppDSD92E9DAypzb3bXO/37DaX1MB3L3//uuiCyTDraCLr0CXnOCnroCznCDDrcDPn2DbrQDrnqD3rEiHneiTn4ifrSivnsu7/ryHTLFjbsTpOsBRvy7o/dpChTRGNmOGTtsVqIgWG2hmFCg95tTe+FhTMa3vkkBem/CgxUVoA9qNFeyOGlrPGsf8C2eyo8x7aSZcAAAAASUVORK5CYII=');
          background-size: 100%;
          user-select: none;
        }
        .delete {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 24px;
          position: absolute;
          bottom: 0;
          right: 0;
          cursor: pointer;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
      .item,
      .empty {
        flex: none;
        width: 99px;
        height: 82px;
        margin: 0 24px 5px 0;
      }
      .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #d8d8d8;
      }
    }
  }
}
</style>
