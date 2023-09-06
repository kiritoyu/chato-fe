<script setup lang="ts">
// TODO: refactor chat
import DocSourceDrawer from '@/components/Chat/ChatDocSourceDrawer.vue'
import Chat from '@/components/Chat/index.vue'
import EnterQa from '@/components/EnterAnswer/EnterQa.vue'
import { currentEnvConfig } from '@/config'
import { USER_ROLES } from '@/constant/common'
import { EDocumentTabType } from '@/enum/knowledge'
import { useBase } from '@/stores/base'
import { useDomainStore } from '@/stores/domain'
import { getMarkDownUrl, replaceMarkdownUrl } from '@/utils/help'
import { removewRegReplaceA } from '@/utils/reg'
import * as url from '@/utils/url'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const base = useBase()
const domainStoreI = useDomainStore()
const { domainInfo } = storeToRefs(domainStoreI)
const domainId = route.params.botId
const dialogVisibleQa = ref(false)
const botSlug = computed(() => domainInfo.value.slug)
const baseURL = currentEnvConfig.uploadBaseURL
const apiUploadPath = `/chato/api/domains/${domainId}/files/upload/qa`
const apiUpload = url.join(baseURL, apiUploadPath)
const qtyLimit = base.userInfo.role === USER_ROLES.SUPERMAN ? 1000 : 20 // 同时上传的文件数量限制
const sizeLimit = 30 // 单个文件的体积限制（MB）
const defaultForm = reactive({
  title: '',
  question_id: 0,
  content: '',
  images: ''
})

const currentDrawer = reactive<{
  questionId: number
  slug: string
  visible: boolean
}>({
  questionId: 0,
  slug: '',
  visible: false
})

const onOpenDrawer = (question_id, slug) => {
  currentDrawer.questionId = question_id
  currentDrawer.slug = slug
  currentDrawer.visible = true
}

function correctAnswer(e) {
  defaultForm.title = e.question
  defaultForm.question_id = e.questionId
  defaultForm.content = replaceMarkdownUrl(removewRegReplaceA(e.content))
  defaultForm.images = getMarkDownUrl(e.content) as unknown as string
  dialogVisibleQa.value = true
}
</script>

<template>
  <Chat
    :isChatingPractice="true"
    :internalProps="true"
    @correct-answer="correctAnswer"
    @show-drawer="(id, slug) => onOpenDrawer(id, slug)"
    :bSlug="botSlug"
  />
  <!-- 文档来源 -->
  <DocSourceDrawer
    v-model:visible="currentDrawer.visible"
    :question-id="currentDrawer.questionId"
    :slug="currentDrawer.slug"
  />
  <EnterQa
    :activeNames="EDocumentTabType.inputText"
    :defaultForm="defaultForm"
    :domainId="(domainId as string)"
    :sizeLimit="sizeLimit"
    :qtyLimit="qtyLimit"
    :apiUpload="apiUpload"
    :dialogVisible="dialogVisibleQa"
    hidden-batch
    @closeDialogVisble="() => (dialogVisibleQa = false)"
  />
</template>
