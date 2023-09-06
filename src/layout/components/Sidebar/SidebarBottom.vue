<template>
  <div class="bg-[#1E253A] px-6 py-5 w-full flex flex-col items-center">
    <SpaceSwitch />
    <span
      v-show="spaceRightsVisible"
      @click="onLinkSpace"
      class="py-2 cursor-pointer w-9 h-9 flex items-center justify-center m-auto mb-3 rounded-lg text-[#9DA3AF] transition-colors hover:bg-[#454D69] hover:text-white"
    >
      <svg-icon name="rights" svg-class="w-6 h-6" />
    </span>
    <UserSetting />
  </div>
</template>

<script setup lang="ts">
import useSidebar from '@/composables/useSidebar'
import { EAllRole } from '@/enum/user'
import { RoutesMap } from '@/router'
import { useBase } from '@/stores/base'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SpaceSwitch from './SpaceSwitch.vue'
import UserSetting from './UserSetting.vue'

const baseStoreI = useBase()
const router = useRouter()

const { userInfo } = storeToRefs(baseStoreI)
const { drawerVisible } = useSidebar()

const spaceRightsVisible = computed(() => userInfo.value.role !== EAllRole.member)

const onLinkSpace = () => {
  drawerVisible.value = false

  router.push({ name: RoutesMap.namespace.management, params: { spaceId: userInfo.value.org.id } })
}
</script>
