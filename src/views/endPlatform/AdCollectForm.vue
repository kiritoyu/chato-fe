<template>
  <div class="w-full h-full flex items-start justify-center bg-[#F2F3F5]">
    <div class="max-w-[600px] bg-white rounded p-4 m-4 mt-8 w-[500px] lg:w-full">
      <h2 class="text-xl font-medium leading-7 text-[#303133] mb-4">留下联系方式</h2>
      <CustomerForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerForm from '@/components/Customer/CustomerForm.vue'
</script>
