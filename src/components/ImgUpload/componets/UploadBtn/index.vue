<template>
  <div
    class="img-upload-btn-container"
    :style="{
      width: itemWidth + 'px',
      height: itemHeight + 'px',
      borderRadius: uploadFillet ? '100%' : 0
    }"
    @click="handleClick"
  >
    <div :class="['img-upload-btn relative', disabled ? 'disabled' : '']">
      <el-icon :size="20" class="icon"><Plus /></el-icon>
      <div class="tip">{{ text }}</div>
      <div
        v-show="uploadBg"
        class="absolute top-0 right-0 left-0 bottom-0 overflow-hidden z-[1]"
        :style="{ borderRadius: uploadFillet ? '100%' : 0 }"
      >
        <img v-if="typeof uploadBg == 'string'" :src="uploadBg" class="w-full h-full" />
        <component v-else :is="uploadBg"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

interface Props {
  text?: string
  disabled?: boolean
  itemWidth?: number
  itemHeight?: number
  uploadFillet?: boolean
  uploadType: 1 | 2
  uploadBg?: string | Component
}

const emit = defineEmits<{
  (e: 'handleChangeAlbumVisible', flag): void
}>()

const props = defineProps<Props>()

const uploadBg = computed(() => props.uploadBg)

const handleClick = () => {
  if (props.uploadType === 2) {
    emit('handleChangeAlbumVisible', true)
  }
}
</script>

<style scoped lang="scss">
.img-upload-btn-container {
  overflow: hidden;
  display: inline-block;
  width: 74px;
  height: 74px;
  border-radius: 6px;
  text-align: center;
  vertical-align: top;
  // background-color: #f5f7fa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover {
    border-color: #7c5cfc;

    .img-upload-btn {
      .icon {
        color: #7c5cfc;
        z-index: 2;
      }
    }
  }
  .img-upload-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &.disabled {
      background-color: #eee;
      .icon {
        color: #00000040;
      }

      .tip {
        color: #00000040;
      }
    }

    .tip {
      margin-top: 5px;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
