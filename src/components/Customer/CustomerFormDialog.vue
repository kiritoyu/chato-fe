<template>
  <el-dialog v-model="internalVisible" title="留下联系方式" :width="isMobile ? '80%' : '40%'">
    <CustomerForm :id="internalFormId" :uid="internalUid" @cancel="onClose" @success="onClose" />
  </el-dialog>
</template>

<script setup lang="ts">
import { useBasicLayout } from '@/composables/useBasicLayout'
import { computed } from 'vue'
import CustomerForm from './CustomerForm.vue'

const props = defineProps<{
  visible: boolean
  formId: string
  uid: string
}>()

const emit = defineEmits(['update:visible'])

const internalVisible = computed({
  get: () => props.visible,
  set: (v) => emit('update:visible')
})

const internalFormId = computed(() => props.formId)
const internalUid = computed(() => props.uid)

const { isMobile } = useBasicLayout()

const onClose = () => {
  internalVisible.value = false
}
</script>
