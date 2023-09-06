<template>
  <el-dialog
    v-model="internalVisible"
    :show-close="showClose"
    :width="internalWidth"
    :title="title"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickMask"
    :close-on-press-escape="closeOnPressEscape"
  >
    <template v-if="slotHeader" #header="headerAttr">
      <slot name="header" v-bind="headerAttr"></slot>
    </template>
    <slot></slot>
    <template v-if="footer" #footer>
      <slot v-if="slotFooter" name="footer"></slot>
      <span v-else>
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          :disabled="internalSubmitDisabled"
          :loading="internalSubmitLoading"
          @click="onSubmit"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useBasicLayout } from '@/composables/useBasicLayout'
import type { ElDialog } from 'element-plus'
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
    width?: string
    mobileWidth?: string
    title?: string
    footer?: boolean
    appendToBody?: boolean
    submitDisabled?: boolean
    submitLoading?: boolean
    showClose?: boolean
    closeOnClickMask?: boolean
    closeOnPressEscape?: boolean
  }>(),
  {
    width: '40%',
    mobileWidth: '80%',
    showClose: true,
    footer: true,
    closeOnClickMask: false,
    closeOnPressEscape: false
  }
)

const emit = defineEmits(['update:visible', 'cancel', 'submit'])

const { isMobile } = useBasicLayout()

const internalVisible = computed({
  get: () => props.visible,
  set: (v) => emit('update:visible', v)
})
const internalWidth = computed(() => (isMobile.value ? props.mobileWidth : props.width))
const internalSubmitDisabled = computed(() => props.submitDisabled)
const internalSubmitLoading = computed(() => props.submitLoading)

const slotHeader = !!useSlots().header
const slotFooter = !!useSlots().footer

const onCancel = () => {
  internalVisible.value = false
  emit('cancel')
}

const onSubmit = () => {
  emit('submit')
  internalVisible.value = false
}
</script>
