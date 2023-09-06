<template>
  <el-dialog
    v-model="internalVisible"
    :width="300"
    :show-close="false"
    align-center
    class="schedule-modal"
  >
    <ScheduleForm submit-btn-text="立即预约" @submit="internalVisible = false" />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ScheduleForm from './ScheduleForm.vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible'])

const internalVisible = computed({
  get: () => props.visible,
  set: (v) => emit('update:visible', v)
})
</script>

<style lang="scss">
.schedule-modal {
  height: 368px;
  border-radius: 16px;
  overflow: hidden;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    background: url('@/assets/img/home/conact-modal-bg.png') center top no-repeat;
    background-size: 300px 368px;
    padding-top: 140px;
  }
}
</style>
