<template>
  <span
    v-if="statusText"
    class="text-[13px] leading-5 mt-[6px] inline-block transition-opacity text-[#B5BED0]"
  >
    {{ statusText }}
  </span>
</template>

<script setup lang="ts">
import { EWsMessageStatus } from '@/enum/message'
import type { IMessageItem } from '@/interface/message'
import { computed } from 'vue'

const props = defineProps<{
  message: IMessageItem
  isLoadingAnswer: boolean
}>()

const internalMessage = computed(() => props.message)
const internalIsLoadingAnswer = computed(() => props.isLoadingAnswer)

const statusText = computed(() => {
  if (
    internalMessage.value.isLoading ||
    internalMessage.value.status === EWsMessageStatus.pending ||
    internalMessage.value.status === EWsMessageStatus.continue
  ) {
    return '正在思考中...'
  } else if (internalIsLoadingAnswer.value) {
    return '正在回答中...'
  } else {
    return null
  }
})
</script>
