<template>
  <div class="text-xs">
    <p class="mb-[16px]">
      <el-button
        type="primary"
        class="text-sm"
        link
        size="large"
        @click="emit('handleEventSet', 'preview', messageTabImg)"
        >查看填写示意图</el-button
      >
    </p>
    <div class="w-full flex pl-[3px]">
      <div class="steps-right w-full">
        <div class="mb-[20px]" v-if="index === 0">
          <p class="text-sm text-[#303133]">
            <span>进入微信</span>
            <a href="https://mp.weixin.qq.com/" target="_blank" class="text-[#2AC74A]"
              >「公众号后台」</a
            >
            <span>复制开发信息</span>
          </p>
          <p class="text-[#9DA3AF] mt-[8px]">
            路径：设置与开发 > 基本配置，启用开发者密码后，复制并填写在下方
          </p>
          <p class="text-[#EA0000] mt-[8px]">未认证公众号暂不支持</p>
          <p class="text-[#EA0000] mt-[8px]">启用后，请在微信公众号后台复制IP白名单</p>
          <el-form
            ref="MessageTabFormRef"
            label-position="left"
            label-width="140px"
            :model="MessageTabForm"
            :rules="MessageTabFormRules"
            style="max-width: 460px"
            class="my-[12px]"
          >
            <el-form-item label="开发者ID" prop="app_id">
              <el-input v-model="MessageTabForm.app_id" placeholder="请填写AppID" />
            </el-form-item>
            <el-form-item label="开发者密码" prop="app_secret">
              <el-input v-model="MessageTabForm.app_secret" placeholder="请填写AppSecret" />
            </el-form-item>
          </el-form>
        </div>
        <div class="mb-[20px] text-[#303133]" v-else>
          <el-switch
            class="mb-[5px]"
            v-model="MessageTabForm.status"
            active-text="开启"
            inactive-text="禁用"
          />
          <p class="text-sm">服务器配置</p>
          <p class="mt-[8px] text-[#9DA3AF]">复制下方信息，在后台修改配置时粘贴</p>
          <div
            class="w-full afficialAccountList-item"
            v-for="item in afficialAccountList"
            :key="item.id"
          >
            <p class="flex justify-between w-full">
              <span class="text-[#303133]">服务器地址（URL）： {{ item.url }}</span>
              <el-button
                type="primary"
                class="mr-[10px] text-xs"
                link
                size="large"
                @click="emit('handleEventSet', 'copy', item.url)"
                >复制</el-button
              >
            </p>
            <p class="flex justify-between">
              <span class="text-[#303133]">令牌（Token）：{{ item.token }}</span>
              <el-button
                type="primary"
                class="mr-[10px] text-xs"
                link
                size="large"
                @click="emit('handleEventSet', 'copy', item.token)"
                >复制</el-button
              >
            </p>
            <p class="flex justify-between">
              <span class="text-[#303133]"
                >消息加解密密钥（EncodingAESKey）：{{ item.encoding_aes_key }}</span
              >
              <el-button
                type="primary"
                class="mr-[10px] text-xs"
                link
                size="large"
                @click="emit('handleEventSet', 'copy', item.encoding_aes_key)"
                >复制</el-button
              >
            </p>
            <p class="flex justify-between">
              <span class="text-[#303133]">ip白名单：{{ item.ip_whitelist }}</span>
              <el-button
                type="primary"
                class="mr-[10px] text-xs"
                link
                size="large"
                @click="emit('handleEventSet', 'copy', item.ip_whitelist)"
                >复制</el-button
              >
            </p>
            <p class="flex justify-between">
              消息加解密方式 <span class="text-[#303133]">明文模式</span>
            </p>
            <p class="mt-[16px]">
              <el-button type="primary" class="text-sm" link size="large" @click="index = 0"
                >重新部署</el-button
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-row justify="end" class="w-full" :gutter="20" v-if="index === 0">
      <el-col :lg="6" :xl="6" :xs="12" :sm="12" :md="12">
        <el-button size="large" @click="handleCloseMessage">取消</el-button>
      </el-col>
      <el-col v-loading="loading" :lg="6" :xl="6" :xs="12" :sm="12" :md="12">
        <el-button size="large" type="primary" @click="() => submit(MessageTabFormRef)"
          >提交</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { createAfficialAccount, serachAfficialAccount } from '@/api/weixin'
import messageTabImg from '@/assets/img/messageTabImg.png'
import { AfficialAccountStatusType } from '@/enum/release'
import type { createAfficialAccountRes } from '@/interface/release'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

const props = defineProps<{
  slug_id: string
}>()

const emit = defineEmits(['handleEventSet', 'handleCloseDialog'])
const MessageTabFormRef = ref<FormInstance>()
const MessageTabForm = reactive<{
  id: number
  app_id: string
  app_secret: string
  s_status: AfficialAccountStatusType
  status?: boolean
}>({
  id: 0,
  app_id: '',
  app_secret: '',
  status: true,
  s_status: AfficialAccountStatusType.normal
})
const loading = ref<boolean>(false)
const afficialAccountList = ref<createAfficialAccountRes[]>([])
const index = ref<number>(0)
const MessageTabFormRules = reactive<FormRules>({
  app_id: [{ required: true, message: '请输入app_id', trigger: 'blur' }],
  app_secret: [{ required: true, message: '请输入app_secret', trigger: 'blur' }]
})

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('请确认填写的开发者ID和开发者密码的是否正确？', '温馨提示', {
        confirmButtonText: '确认无误',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          submitForm()
        })
        .catch(() => {})
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const submitForm = async () => {
  loading.value = true
  const data = { ...MessageTabForm }
  data.status
    ? (data.s_status = AfficialAccountStatusType.normal)
    : (data.s_status = AfficialAccountStatusType.disabled)
  delete data.status
  await createAfficialAccount(props.slug_id, data)
  init()
  loading.value = false
}

const init = async () => {
  const res = await serachAfficialAccount(props.slug_id)
  afficialAccountList.value = res.data.data
  const defaultAfficialAccount =
    afficialAccountList.value.length > 0 ? afficialAccountList.value[0] : null
  index.value = afficialAccountList.value.length > 0 ? 1 : 0
  if (defaultAfficialAccount) {
    MessageTabForm.id = defaultAfficialAccount.id
    MessageTabForm.app_id = defaultAfficialAccount.app_id
    MessageTabForm.app_secret = defaultAfficialAccount.app_secret
    MessageTabForm.s_status = defaultAfficialAccount.s_status
    MessageTabForm.status = defaultAfficialAccount.s_status === 'normal' ? true : false
  }
}

const handleCloseMessage = () => {
  if (!afficialAccountList.value.length) {
    emit('handleCloseDialog')
  } else {
    index.value = 1
  }
}

const watchProps = watch(
  () => MessageTabForm.status,
  (v) => {
    submitForm()
  }
)

onMounted(() => {
  init()
})
onUnmounted(() => {
  watchProps()
})
</script>

<style scoped lang="scss">
.afficialAccountList-item {
  margin-top: 10px;
  p {
    margin-bottom: 5px;
  }
}
</style>
