<template>
  <Topbar :title="t('我的机器人')" class="!mb-0 lg:!mb-4" />
  <ContentLayout class="pt-8 lg:pt-0">
    <div
      v-loading="initing"
      class="grid grid-cols-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4"
    >
      <div
        data-script="Chato-createBot"
        class="bg-white rounded-lg min-h-[200px] leading-5 flex flex-col items-center justify-center gap-4 transition cursor-pointer h-full hover:shadow-lg hover:-translate-y-2 lg:p-4 lg:gap-3 lg:h-auto lg:hover:-translate-y-0"
        @click="onNew"
      >
        <div
          class="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-[#F2F3F5] lg:w-10 lg:h-10"
        >
          <el-icon :size="20" class="text-[#596780]">
            <Plus />
          </el-icon>
        </div>
        <p class="font-medium text-sm text-[#7C5CFC]">{{ t('创建机器人') }}</p>
        <p class="text-[#9DA3AF] text-[13px]">{{ t('快速创建一个属于你的机器人吧！') }}</p>
      </div>
      <BotListCard
        v-for="item in domainList"
        :key="item.id"
        :bot="item"
        @delete="onDelete"
        @cloneRobot="cloneRobot"
        @sync="onOpenSync"
        @visible="setBotUseScopeDialogVisible"
      />
    </div>
  </ContentLayout>
  <Modal
    v-model:visible="dialogState.visible"
    :title="dialogState.title"
    :footerAttrs="{
      submitting: syncSubmiting
    }"
    @cancel="onClose"
    @submit="onSync"
  >
    <el-row align="middle" class="mb-5">
      <el-col :span="5">{{ t('机器人分类') }}</el-col>
      <el-col :span="19">
        <el-select
          v-loading="domainCategoryLoading"
          v-model="opDomain.category"
          :placeholder="t(`请选择机器人分类`)"
        >
          <el-option v-for="item in domainCategoryList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
    </el-row>
  </Modal>
  <Modal
    v-model:visible="accessPermissionDialogVisible"
    title="访问权限"
    @submit="onSetBotUseScope"
  >
    <div>
      <el-radio-group v-model="opDomain.use_scope">
        <el-radio v-for="item in visibleOptions" :key="item.value" :label="item.value">
          {{ t(item.label) }}
        </el-radio>
      </el-radio-group>
      <div class="text-[#9DA3AF] text-xs my-2">
        {{
          t(
            opDomain.use_scope
              ? '所有人都可以看到你创建的机器人，并可以对其进行操作'
              : '仅对自己和空间创建者可见，其他人不能看见你的机器人'
          )
        }}
      </div>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
import {
  cloneDomainRobot,
  getDomainCategoryList,
  updateBotUseScope,
  updateDomainInResource
} from '@/api/domain'
import { deletesDomain } from '@/api/user'
import Modal from '@/components/Modal/index.vue'
import Topbar from '@/components/Topbar/index.vue'
import { useBasicLayout } from '@/composables/useBasicLayout'
import useSpaceRights from '@/composables/useSpaceRights'
import { ESpaceRightsType } from '@/enum/space'
import type { IDomainInfo } from '@/interface/domain'
import ContentLayout from '@/layout/ContentLayout.vue'
import { RoutesMap } from '@/router'
import { useChatStore } from '@/stores/chat'
import { useDomainStore } from '@/stores/domain'
import { ElLoading, ElMessage, ElMessageBox, ElNotification, ElSelect } from 'element-plus'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BotListCard from './components/BotListCard.vue'

const { t } = useI18n()
const router = useRouter()
const chatStoreI = useChatStore()
const domainStoreI = useDomainStore()
const loading = ref()
const initing = ref(false)
const accessPermissionDialogVisible = ref(false)
const dialogState = reactive({
  visible: false,
  title: '',
  action: '',
  type: ''
})
const { domainList } = storeToRefs(domainStoreI)
const { checkRightsTypeNeedUpgrade } = useSpaceRights()
const { isMobile } = useBasicLayout()
const visibleOptions = [
  {
    value: 1,
    label: '公开'
  },
  {
    value: 0,
    label: '私密'
  }
] as const

const setBotUseScopeDialogVisible = (bot: IDomainInfo) => {
  accessPermissionDialogVisible.value = true
  opDomain.value = { ...bot }
}

const onSetBotUseScope = async () => {
  try {
    await updateBotUseScope(opDomain.value.id!, opDomain.value.use_scope)
    const findItem = domainList.value.find((item) => item.id === opDomain.value.id)
    if (!findItem) return
    findItem.use_scope = opDomain.value.use_scope
    accessPermissionDialogVisible.value = false
  } catch (error) {}
}

const onNew = async () => {
  const needUpgrade = await checkRightsTypeNeedUpgrade(ESpaceRightsType.bot)
  if (needUpgrade) {
    return
  }
  router.push({ name: RoutesMap.manager.create })
}

const onRefresh = async () => {
  try {
    initing.value = true
    await domainStoreI.initDomainList()
    await chatStoreI.initChatList()
  } catch (err) {
  } finally {
    initing.value = false
  }
}

const onDelete = async (item: IDomainInfo) => {
  try {
    const confirmMessage = t(
      '确定要删除您的聊天机器人吗？删除同时废止链接、嵌入代码、API 接口，此操作无法撤消。'
    )

    await ElMessageBox.confirm(confirmMessage, t('确认删除'), {
      confirmButtonText: t('确认'),
      cancelButtonText: t('取消'),
      type: 'warning'
    })

    loading.value = ElLoading.service({
      lock: true,
      text: t('删除中...'),
      background: 'rgba(0, 0, 0, 0.7)'
    })
    await deletesDomain(item.id)
    ElNotification.success(t('删除成功'))
    await onRefresh()
  } catch (err) {
  } finally {
    loading.value.close()
  }
}

const opDomain = ref<Partial<IDomainInfo>>({})

const onOpenSync = async (bot: IDomainInfo, type: 'visible' | 'template') => {
  opDomain.value = { ...bot }

  let actionType = type === 'visible' ? t('可见') : t('不可见')
  if (type === 'template') {
    actionType = bot.template ? t('资源广场机器人') : t('模板机器人')
  }

  dialogState.title = t('设置为{actionType}', { actionType: actionType })
  dialogState.type = type
  dialogState.visible = true
}

const syncSubmiting = ref(false)

const onSync = async () => {
  try {
    const saveValue = Number(
      !(dialogState.type === 'visible' ? opDomain.value.visible : opDomain.value.template)
    )

    syncSubmiting.value = true
    await updateDomainInResource(opDomain.value.id, {
      visible: dialogState.type === 'visible' ? saveValue : opDomain.value.visible,
      template: dialogState.type === 'template' ? saveValue : opDomain.value.template,
      category: opDomain.value.category
    })
    dialogState.visible = false
    opDomain.value = {}
    ElNotification.success(t('操作成功'))
    await onRefresh()
  } catch (err) {
  } finally {
    syncSubmiting.value = false
  }
}

const onClose = () => {
  dialogState.visible = false
  opDomain.value = {}
}

const cloneDomainRobotSubmit = async (slug: string, is_need_document: 0 | 1, name: string) => {
  loading.value = ElLoading.service({
    lock: true,
    text: t('克隆中...'),
    background: 'rgba(0, 0, 0, 0.7)'
  })
  try {
    await cloneDomainRobot(slug, { is_need_document })
    ElMessage.success(t('克隆成功，{name}已创建成功', { name: name }))
    await onRefresh()
  } catch (e) {
  } finally {
    loading.value.close()
  }
}

const cloneRobot = async (id: string, name: string) => {
  ElMessageBox.confirm(
    t(
      '复制并新建此机器人。<br> 克隆范围包含角色信息和知识库，不包含对外发布及数据报表。请确认是否克隆该机器人？'
    ),
    t('克隆机器人'),
    {
      confirmButtonText: t('确认'),
      cancelButtonText: t('取消'),
      dangerouslyUseHTMLString: true,
      type: 'warning'
    }
  )
    .then(() => {
      cloneDomainRobotSubmit(id, 1, name)
    })
    .catch(() => {})
}

const domainCategoryLoading = ref(false)
const domainCategoryList = ref<string[]>([])
const initDomainCategoryList = async () => {
  try {
    domainCategoryLoading.value = true
    const {
      data: { data }
    } = await getDomainCategoryList()
    domainCategoryList.value = data
  } catch (e) {
  } finally {
    domainCategoryLoading.value = false
  }
}

onMounted(() => {
  initDomainCategoryList()
  onRefresh()
})

watch(domainList, (d) => {
  if (!d.length) {
    router.push({ name: RoutesMap.manager.center })
  }
})
</script>
