<template>
  <Chat @show-drawer="(id, slug) => showDrawer(id, slug)" @correct-answer="correctAnswer" />

  <!-- 文档来源 -->
  <DocSourceDrawer
    v-model:visible="drawerShow"
    :question-id="currentQuestionId"
    :slug="currentSlug"
    :terminal="ETerminal.C"
  />

  <EnterQa
    :activeNames="EDocumentTabType.inputText"
    :defaultForm="defaultForm"
    :sizeLimit="sizeLimit"
    :qtyLimit="qtyLimit"
    :apiUpload="apiUpload"
    :dialogVisible="dialogVisibleQa"
    hidden-batch
    @closeDialogVisble="() => (dialogVisibleQa = false)"
  />
</template>

<script setup lang="ts">
// TODO: refactor chat
import { postCheckLoginCAPI } from '@/api/auth'
import DocSourceDrawer from '@/components/Chat/ChatDocSourceDrawer.vue'
import Chat from '@/components/Chat/index.vue'
import EnterQa from '@/components/EnterAnswer/EnterQa.vue'
import { currentEnvConfig } from '@/config'
import { USER_ROLES } from '@/constant/common'
import { ETerminal } from '@/enum/common'
import { EDocumentTabType } from '@/enum/knowledge'
import router, { RoutesMap } from '@/router'
import { useBase } from '@/stores/base'
import { getMarkDownUrl, replaceMarkdownUrl } from '@/utils/help'
import { removewRegReplaceA } from '@/utils/reg'
import * as url from '@/utils/url'
import { useStorage } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const currentQuestionId = ref<number>()

const drawerShow = ref(false)
const showDrawer = (question_id, slug) => {
  currentQuestionId.value = question_id
  currentSlug.value = slug
  drawerShow.value = true
}

const route = useRoute()
const base = useBase()
const $uid = useStorage('uid', '')
const domainId = route.params.botId as string
const currentSlug = ref<string>((route.params.botSlug as string) || '')
const dialogVisibleQa = ref(false)
const baseURL = currentEnvConfig.uploadBaseURL
const apiUploadPath = `/chato/api/domains/${domainId}/files/upload/qa`
const apiUpload = url.join(baseURL, apiUploadPath)
const qtyLimit = base.userInfo.role === USER_ROLES.SUPERMAN ? 1000 : 20 // 同时上传的文件数量限制
const sizeLimit = 30 // 单个文件的体积限制（MB）
const defaultForm = reactive({
  title: '',
  question_id: 0,
  content: '',
  images: []
})

const correctAnswer = (e) => {
  defaultForm.title = e.question
  defaultForm.question_id = e.questionId
  defaultForm.content = replaceMarkdownUrl(removewRegReplaceA(e.content))
  defaultForm.images = getMarkDownUrl(e.content)
  dialogVisibleQa.value = true
}

// 校验C端登录
const checkLoginMobile = async () => {
  const res = await postCheckLoginCAPI(currentSlug.value, $uid.value)
  if (!res.data.data.login || !res.data.data.usable) {
    router.push({
      name: RoutesMap.auth.loginInvite,
      query: {
        slug: currentSlug.value
      }
    })
  }
}

checkLoginMobile()
</script>
