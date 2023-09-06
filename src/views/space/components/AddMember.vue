<template>
  <Modal
    mobile-width="100%"
    title="添加成员"
    v-model:visible="internalVisible"
    :footer="false"
    class="addMember-container"
  >
    <p class="text-[#9DA3AF] text-xs">对方打开链接，点击“确认”并登录，即可加入该空间</p>
    <p class="body-role my-4 text-[#2F3447]">
      <label class="mr-4">权限设置</label>
      <el-radio-group v-model="inviteRole">
        <el-radio label="owner">管理者</el-radio>
        <el-radio label="member">使用者</el-radio>
      </el-radio-group>
    </p>
    <p class="text-[#596780] mb-4" v-loading="loading">{{ inviteLink }}</p>
    <el-row class="w-full" justify="end" v-if="!loading">
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <el-button type="primary" @click="() => handleCopyLink(inviteLink)">复制链接</el-button>
      </el-col>
    </el-row>
  </Modal>
</template>

<script setup lang="ts">
import { getInviteLink } from '@/api/space'
import Modal from '@/components/Modal/index.vue'
import { ESettingSpaceRole } from '@/enum/space'
import { encodeParam } from '@/utils/string'
import { useClipboard } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import { computed, onUnmounted, ref, watch } from 'vue'

const inviteRole = ref<ESettingSpaceRole>(ESettingSpaceRole.owner)
const clipboard = useClipboard({ legacy: true })
const link = ref('')
const loading = ref(true)
const inviteLink = computed<string>(() => {
  return (
    location.origin +
    '/invite?invite_ticket=' +
    link.value +
    '&inviteType=' +
    encodeParam(inviteRole.value)
  )
})

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const internalVisible = computed({
  get: () => props.visible,
  set: (v) => emit('update:visible', v)
})

const handleCopyLink = (text: string) => {
  if (!clipboard.isSupported) {
    ElNotification.warning('您的浏览器版本较低，请手工选中文本并复制。')
  } else {
    clipboard.copy(text)
    const stop = watch(clipboard.copied, (newValue) => {
      if (newValue) {
        ElNotification.success('已复制！')
        stop()
      }
    })
  }
}

const getLink = async (v) => {
  loading.value = true
  const res = await getInviteLink({ role: v })
  if (res.data.code === 200) {
    link.value = res.data.data
  }
  loading.value = false
}

const watchInviteRole = watch(
  inviteRole,
  (v) => {
    getLink(v)
  },
  { immediate: true }
)

onUnmounted(() => {
  watchInviteRole()
})
</script>

<style scoped lang="scss">
.body-role {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

<style lang="scss">
.addMember-container {
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
