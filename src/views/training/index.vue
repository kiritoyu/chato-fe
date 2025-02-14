<template>
  <Topbar
    :center="false"
    class="bg-white relative px-16 lg:px-4 lg:h-auto lg:flex-col"
    style="border-bottom: 1px solid #e4e7ed"
  >
    <el-popover
      v-model:visible="popoverVisible"
      placement="bottom"
      :width="200"
      :popper-style="{ padding: 0 }"
      :trigger="isMobile ? 'click' : 'hover'"
    >
      <template #reference>
        <div
          class="flex gap-2 items-center cursor-pointer lg:-translate-x-1/2 lg:absolute lg:left-1/2"
        >
          <Avatar
            :avatar="domainInfo.avatar || DefaultAvatar"
            :size="28"
            :name="domainInfo.name.slice(0, 2)"
          />
          <p class="max-w-[120px] truncate text-sm font-medium">
            {{ domainInfo.name }}
          </p>
          <svg-icon name="arrow-expand" svg-class="w-4 h-4 text-[#303133]"></svg-icon>
        </div>
      </template>
      <ul class="flex flex-col gap-2 max-h-[180px] px-4 my-3 overflow-y-auto">
        <li
          v-for="item in domainList"
          :key="item.id"
          @click="changeCurrentBot(item)"
          :class="[
            domainInfo.id === item.id && 'current-select-li',
            'flex gap-2 items-center text-[#606266] text-sm cursor-pointer p-2 rounded-lg transition-colors hover:text-[#7c5cfc] hover:bg-[#f4f1ff]'
          ]"
        >
          <Avatar :avatar="item.avatar || DefaultAvatar" :name="item.name.slice(0, 2)" :size="24" />
          <p class="truncate">{{ item.name }}</p>
        </li>
      </ul>
    </el-popover>
    <template #secondBar>
      <HorizontalMenu
        v-if="!isMobile"
        :active="activeMenu"
        :menus="menus"
        @select="onMenuSelect"
        :height="54"
        class="!absolute -translate-x-1/2 left-1/2 h-14"
      />
    </template>
  </Topbar>
  <HorizontalMenu
    v-if="isMobile"
    :active="activeMenu"
    :menus="menus"
    :height="45"
    @select="onMenuSelect"
    class="w-full !px-4"
  />
  <router-view />
</template>

<script setup lang="ts">
import DefaultAvatar from '@/assets/img/avatar.png'
import Avatar from '@/components/Avatar/index.vue'
import HorizontalMenu from '@/components/HorizontalMenu/index.vue'
import Topbar from '@/components/Topbar/index.vue'
import { useBasicLayout } from '@/composables/useBasicLayout'
import type { IMenuItem } from '@/interface/common'
import { RoutesMap } from '@/router'
import { useDomainStore } from '@/stores/domain'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { isMobile } = useBasicLayout()
const domainStoreI = useDomainStore()
const { domainInfo, domainList } = storeToRefs(domainStoreI)

const popoverVisible = ref(false)

const activeMenu = computed(() => route.name as string)

const menus: IMenuItem[] = [
  { title: '角色信息', routeName: RoutesMap.tranning.roleInfo },
  { title: '知识库', routeName: RoutesMap.tranning.knowledge },
  { title: '对外发布', routeName: RoutesMap.tranning.release },
  { title: '数据报表', routeName: RoutesMap.tranning.report }
]

const onMenuSelect = (routeName: string) => {
  router.push({
    name: routeName,
    // botId 复写意义防止部分菜单未含有 botId 跳转至需要 botId 的页面
    params: { ...route.params, botId: domainInfo.value.id, type: undefined }
  })
}

const changeCurrentBot = async (item) => {
  popoverVisible.value = false
  await domainStoreI.$patch({
    domainInfo: item
  })
  router.push({
    name: route.name,
    params: { ...route.params, botId: item.id }
  })
}
</script>
