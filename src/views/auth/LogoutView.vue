<template>
  <div class="init-loading" v-loading="true" element-loading-background="transparent"></div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStoreI = useAuthStore()

function init() {
  logout()
}

function logout() {
  authStoreI.logout()
  router.push('/')
}

init()
</script>

<style lang="scss" scoped>
.init-loading {
  position: relative;
  height: 85vh;
}
</style>
