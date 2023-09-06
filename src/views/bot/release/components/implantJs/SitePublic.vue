<template>
  <el-form
    ref="ruleFormCreateSiteRef"
    size="large"
    label-position="top"
    :rules="rulesCreateSitePublic"
    :model="inputCreateSiteForm"
    class="input-text-form"
  >
    <el-form-item label="站点名称" prop="name">
      <el-input
        type="text"
        v-model="inputCreateSiteForm.name"
        placeholder="请输入站点名称"
      ></el-input>
    </el-form-item>
  </el-form>
  <slot :submit="inputCreateSiteForm" :ruleFormCreateSiteRef="ruleFormCreateSiteRef"></slot>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    name?: string
  }>(),
  {
    name: ''
  }
)

const ruleFormCreateSiteRef = ref()

const rulesCreateSitePublic = reactive({
  name: [{ required: true, trigger: 'blur', message: '请输入站点名字' }]
})

const inputCreateSiteForm = reactive({
  name: ''
})

const watchProps = watch(
  props,
  (v) => {
    inputCreateSiteForm.name = v.name
  },
  { deep: true, immediate: true }
)

onUnmounted(() => {
  watchProps()
})
</script>

<style scoped></style>
