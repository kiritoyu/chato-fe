<template>
  <div class="w-[400px] box-border rounded-2xl px-7 py-6 bg-white lg:w-full">
    <p class="text-[#303133] text-lg font-medium mb-4 flex items-center">
      <svg-icon name="phone" svg-class="w-[22px] h-[22px] mr-1" />
      联系我们
    </p>
    <p class="text-[#596780] text-sm leading-5 mb-6">将有专人为您提供产品解决方案，专业答疑等</p>

    <ScheduleForm submit-btn-text="预约回电" submit-btn-class="!bg-[#303133]" />
  </div>
</template>

<script setup lang="ts">
import ScheduleForm from './ScheduleForm.vue'
</script>
