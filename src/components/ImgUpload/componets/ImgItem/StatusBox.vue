<template>
  <div class="status-box">
    <div v-if="file.status === 'uploading'" class="upload">
      <svg class="progress" width="60px" height="60px">
        <circle
          r="25"
          cy="30"
          cx="30"
          strokeWidth="5"
          stroke="#7c5cfc"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          r="25"
          cy="30"
          cx="30"
          strokeWidth="5"
          stroke="#7c5cfc"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          strokeDashoffset="0px"
          :strokeDasharray="percentageLenght + 'px'"
        />
      </svg>
      <span>{{ file.percentage }}%</span>
    </div>
    <div v-if="file.status === 'fail'" class="error">
      <div class="error-info">上传失败</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus'
import { computed } from 'vue'
interface Props {
  file: UploadFile
}

const props = defineProps<Props>()

const percentageLenght = computed(() => {
  const radius = 25
  return (Math.ceil(2 * 3.14 * radius) * (props.file.percentage || 0)) / 100
})
</script>

<style scoped lang="scss">
.status-box {
  display: inline-block;
  position: relative;
  // margin: 0 8px 8px 0;
  &:hover {
    .error {
      display: none;
    }
  }
  .upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
    .progress {
      position: absolute;
      filter: drop-shadow(0, 0, 5px, white);
      // transition: linear 0.25s;
    }
  }
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
    color: #f1492c;
  }
}
</style>
