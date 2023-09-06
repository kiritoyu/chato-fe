<template>
  <div class="w-full text-[#303133]">
    <p>请选择机器人</p>
    <ImageSelect
      class="my-[16px]"
      v-model:value="selectedDomain"
      :list="domainList"
      placeholder="请选择机器人"
    />
    <p class="font-medium mb-[16px]">转移须知：</p>
    <div class="text-[#596780] text-[12px] leading-6">
      <p>1.更换后，使用上述机器人的能力在群聊中回复；</p>
      <p>2.群聊信息会转移至上述机器人内。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDomainInfo } from '@/interface/domain'
import { computed } from 'vue'
import ImageSelect from './ImageSelect.vue'

const emit = defineEmits(['update:value'])
const props = defineProps<{
  value: IDomainInfo
  domainList: IDomainInfo[]
}>()
const selectedDomain = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val)
})
</script>

<style scoped></style>
