<template>
  <img :src="spaceCommercialTypeImg" class="w-[29px] h-3 object-cover shrink-0" />
</template>

<script setup lang="ts">
import FVip from '@/assets/img/vip-f.png'
import SVip from '@/assets/img/vip-s.png'
import { ESpaceCommercialType } from '@/enum/space'
import { computed } from 'vue'

const props = defineProps<{
  type: ESpaceCommercialType
}>()

// 因为 UI 没法将文字单独切 icon，所以引入 png
const spaceCommercialTypeImg = computed(() =>
  props.type === ESpaceCommercialType.free ? FVip : SVip
)
</script>
