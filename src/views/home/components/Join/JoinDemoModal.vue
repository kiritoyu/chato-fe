<template>
  <el-dialog v-model="internalVisible" :show-close="false" align-center class="join-modal">
    <JoinForm @submit="internalVisible = false" />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JoinForm from './JoinForm.vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible'])

const internalVisible = computed({
  get: () => props.visible,
  set: (v) => emit('update:visible', v)
})
</script>

<style lang="scss">
.join-modal {
  width: 300px;
  height: 515px;
  border-radius: 16px;
  overflow: hidden;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    background: url('@/assets/img/home/invest-modal-bg.png') center top no-repeat;
    background-size: 300px 368px;
    padding-top: 140px;
  }
}
</style>
