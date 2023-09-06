<template>
  <div>
    <p class="mb-[16px]">
      <el-switch v-model="showPublic" size="large" active-text="开启" inactive-text="关闭" />
    </p>
    <p class="text-[#9DA3AF] mb-[16px]">复制下方信息，在「飞书开放平台」粘贴</p>
    <div class="flex justify-between flex-wrap items-center mb-[16px] pr-4">
      <div class="work-break md:my-1 md:flex md:flex-col">
        <label for="生成地址">生成地址：</label>
        <span class="ml-[10px] md:ml-0 md:my-1">{{ url }}</span>
      </div>
      <el-button type="primary" link @click="emit('handleCopyUrl', url)">复制</el-button>
    </div>
    <p class="mt-[12px] text-[#596780]">
      <el-button size="large" type="primary" link @click="emit('handleResetConfig')"
        >重新配置</el-button
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  url: string
  ban: boolean
}>()
const emit = defineEmits(['handleResetConfig', 'handleCopyUrl', 'handleChange', 'update:ban'])
const showPublic = computed({
  get: () => props.ban,
  set: (val) => emit('update:ban', val)
})
</script>

<style scoped></style>
