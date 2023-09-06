<template>
  <el-dialog
    :model-value="visible"
    :show-close="false"
    :width="width"
    :modal="modal"
    append-to-body
    :close-on-press-escape="pressEscape"
    :close-on-click-modal="clickModal"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
        <el-icon @click="() => emit('onCancel')" class="el-icon--left"><Close /></el-icon>
      </div>
    </template>
    <slot></slot>
    <template v-if="footer" #footer>
      <span class="dialog-footer">
        <el-button @click="() => emit('onCancel')">取消</el-button>
        <el-button type="primary" :disabled="disabled" @click="() => emit('onSubmit')">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface Props {
  width: string
  title: string
  footer: boolean
  visible: boolean
  modal?: boolean
  clickModal?: boolean
  pressEscape?: boolean
  disabled?: boolean
}
withDefaults(defineProps<Props>(), {
  clickModal: false,
  pressEscape: false,
  modal: true,
  disabled: false
})
interface EmitProps {
  (e: 'onCancel'): void
  (e: 'onSubmit'): void
}
const emit = defineEmits<EmitProps>()
</script>

<style scoped lang="scss">
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
