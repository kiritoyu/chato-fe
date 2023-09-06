<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  code: {
    type: Number,
    required: true
  }
})

const messages = {
  403: '抱歉，您无权访问该页面。',
  404: '抱歉，您访问的页面不存在。',
  500: '抱歉，服务器出错了。'
}

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}

const showBackBtn = computed(() => {
  const historyState = window.history.state || {}
  const isLandingRoute = historyState.position === 1
  return !isLandingRoute
})
</script>

<template>
  <div class="exception">
    <div>
      <div class="status">{{ code }}</div>
      <div class="message">{{ messages[props.code] }}</div>
      <div class="flex gap-3 items-center justify-center">
        <el-button :type="showBackBtn ? '' : 'primary'" plain @click="goHome">返回首页</el-button>
        <el-button v-if="showBackBtn" type="primary" plain @click="goBack"> 返回上一页 </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exception {
  padding-top: 40px;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
}

.status {
  line-height: 1.8;
  font-size: 72px;
}

.message {
  margin: 10px auto 20px;
  font-size: 14px;
  color: #666;
}
</style>
