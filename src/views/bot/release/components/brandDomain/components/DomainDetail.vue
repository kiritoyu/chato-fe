<template>
  <div class="w-full p-[12px] detail-container">
    <p class="font-medium">域名详情</p>
    <p class="!text-[#9DA3AF] text-xs">为了不影响网站正常使用，请保证域名和安全证书均在有效期内</p>
    <p>绑定的独立域名： {{ brandDomainInfoDecorate.hostname }}</p>
    <p>域名备案信息： {{ brandDomainInfoDecorate.record }}</p>
    <p>
      安全证书文件：<a
        :href="brandDomainInfoDecorate.pub_key.url"
        :download="brandDomainInfoDecorate.pub_key.name"
        >{{ brandDomainInfoDecorate.pub_key.name }}</a
      >
    </p>
    <p>
      安全密匙文件：<a
        :href="brandDomainInfoDecorate.pri_key.url"
        :download="brandDomainInfoDecorate.pri_key.name"
        >{{ brandDomainInfoDecorate.pri_key.name }}</a
      >
    </p>
    <p><el-button type="primary" link @click="handleReplySubmit">重新部署</el-button></p>
  </div>
</template>

<script setup lang="ts">
import type { brandDomainType } from '@/interface/release'
import type { UploadUserFile } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { computed } from 'vue'

const emit = defineEmits(['nextClick'])
type brandDomainTypeProp = brandDomainType & {
  pub_key: UploadUserFile
  pri_key: UploadUserFile
}
const props = defineProps<{
  brandDomainInfo: brandDomainTypeProp
}>()

const brandDomainInfoDecorate = computed(() => {
  return {
    ...props.brandDomainInfo,
    pri_key: JSON.parse(props.brandDomainInfo.pri_key as string),
    pub_key: JSON.parse(props.brandDomainInfo.pub_key as string)
  }
})

const handleReplySubmit = () => {
  ElMessageBox.confirm('你确认要重新部署吗？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      emit('nextClick', 1)
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.detail-container {
  p {
    font-size: 14px;
    margin-bottom: 16px;
    color: #303133;
  }
}
</style>
