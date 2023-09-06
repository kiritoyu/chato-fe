<template>
  <div class="relative shrink-0" :style="{ height: `${size}px` }">
    <el-avatar :size="size" :style="{ '--el-avatar-bg-color': avatar ? 'transparent' : undefined }">
      <img v-if="avatar" :src="avatar" class="w-full h-full object-cover" />
      <span
        v-else-if="name"
        :class="[
          'text-sm w-full h-full overflow-hidden truncate',
          showAllName ? 'text-xs scale-90' : 'bg-[#7C5CFC]'
        ]"
        :style="{ lineHeight: `${size}px` }"
      >
        {{ showAllName ? name : name[0] }}
      </span>
    </el-avatar>
    <SpaceRightsIcon
      v-if="withRights"
      :type="commercialType"
      class="absolute bottom-[2px] translate-x-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import SpaceRightsIcon from '@/components/Space/SpaceRightsIcon.vue'
import type { ESpaceCommercialType } from '@/enum/space'
import type { IUserInfo } from '@/interface/user'

withDefaults(
  defineProps<{
    size?: number
    avatar?: IUserInfo['avatar']
    name?: string
    commercialType?: ESpaceCommercialType
    withRights?: boolean
    showAllName?: boolean
  }>(),
  {
    limit: 20,
    size: 40
  }
)
</script>
