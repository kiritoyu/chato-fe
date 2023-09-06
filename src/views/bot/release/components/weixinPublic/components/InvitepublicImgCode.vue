<template>
  <div
    v-loading="!robotQrCode?.url"
    class="w-full flex justify-start cursor-pointer items-center mb-[16px] text-[#9DA3AF] leading-4"
  >
    <img :src="robotQrCode?.url" alt="" class="w-[180px] h-[180px] mr-[24px] rounded-lg" />
    <div class="text-[12px] text-[#9DA3A] w-full">
      <p class="text-[#303133] text-[14px]">扫一扫左侧二维码，添加机器人为好友</p>
      <p class="text-[12px] text-[#7C5CFC] mt-[14px] mb-[5px]">添加成功后，将机器人拉入群聊</p>
      <p class="text-[12px] text-[#7C5CFC] mt-[5px] mb-[20px] flex justify-between">
        <span class="text-[#303133]">添加机器人时请填写：{{ robotQrCode?.secret }}</span>
        <span @click="() => $copyText(robotQrCode?.secret)">复制</span>
      </p>
      <p class="text-[#596780]">用户须知</p>
      <p>1.不能与机器人单独聊天</p>
      <p>2.机器人只能在加入的第一个群里生效</p>
      <p>3.@机器人提问，机器人即可自动回复</p>
    </div>
  </div>
  <el-row justify="end">
    <el-col :lg="4" :xl="4" :md="12" :xs="12" :sm="12">
      <el-button @click="emit('handleClose')" type="primary">完成</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { RobotQrCodeInfoProps } from '@/interface/release'
import { computed } from 'vue'

const props = defineProps<{
  robotQrCodeInfo: RobotQrCodeInfoProps
}>()

const robotQrCode = computed(() => props.robotQrCodeInfo)

const emit = defineEmits(['handleClose'])
</script>

<style scoped></style>
