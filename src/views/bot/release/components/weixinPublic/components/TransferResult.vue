<template>
  <div class="w-full flex flex-col items-center justify-center">
    <span class="text-[#7C5CFC]"
      ><el-icon class="text-[#7C5CFC]" size="24"><SuccessFilled /></el-icon
    ></span>
    <p class="text-[#7C5CFC] text-[14px] my-[16px]">已转移成功</p>
    <p>
      可前往
      <span class="text-[#7C5CFC] text-[12px]" @click="emit('handlePush')">「机器人名称」</span>
      查看
    </p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['handlePush'])
</script>

<style scoped></style>
