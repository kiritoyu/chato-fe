<template>
  <div class="application-form-container">
    <div
      class="a-f-header pt-[40px] pb-4 pl-[40px] flex md:flex-col md:items-center md:py-5 md:px-5"
    >
      <img :src="ReleaseFormLogo" class="md:mb-3" alt="logo" />
      <div class="a-f-title flex flex-col md:flex-col items-start md:items-center">
        <span class="mb-[28px] font-medium md:text-sm"
          >提交以下信息后，即可开通并分享给他人使用</span
        >
        <PlatFormList :platformList="platformList" />
      </div>
    </div>
    <el-form
      ref="applicationFormRef"
      :rules="applicationFormRules"
      :model="applicationForm"
      size="large"
      labelPosition="top"
      label-width="120px"
      status-icon
      class="w-[50%] md:w-[100%] m-auto"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="applicationForm.name" placeholder="请输入您的名字" />
      </el-form-item>
      <el-form-item label="所属行业" prop="industry">
        <el-select v-model="applicationForm.industry" class="w-full" placeholder="请选择行业">
          <el-option v-for="item in industryList" :label="item" :key="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="company">
        <el-input v-model="applicationForm.company_name" placeholder="请输入您的公司的名称" />
      </el-form-item>
      <el-form-item class="mt-[56px]">
        <el-row class="w-full">
          <el-col :xl="4" :lg="4" :sx="12" :sm="12" :md="12">
            <el-button type="primary" @click="() => onSubmit(applicationFormRef)"
              >提交审核</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { applicationFormSave, getIndustry } from '@/api/release'
import ReleaseFormLogo from '@/assets/img/release-form-logo.png'
import type { FormInstance, FormRules } from 'element-plus'
import { ElLoading, ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import PlatFormList from './components/PlatFormList.vue'

const props = defineProps<{
  org_id: number
  org_user_id: number
}>()

const emit = defineEmits(['handleUpdateOrgInfo'])

const applicationFormRef = ref<FormInstance>()
const platformList = ['pc', 'copy', 'chat', 'api', 'public-wx', 'enterprise-wx', 'other']

const industryList = ref<string[]>([])
const applicationForm = reactive({
  name: '',
  industry: '',
  company_name: ''
})
const applicationFormRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入您的名字', trigger: 'blur' }],
  industry: [{ required: true, message: '请选择行业', trigger: 'blur' }],
  company_name: [{ required: true, message: '请选择行业', trigger: 'blur' }]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: '审核中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = {
        ...props,
        ...applicationForm
      }
      const res = await applicationFormSave(data)
      loading.close()
      if (res.data.code === 200) {
        ElNotification({
          title: '审核结果',
          message: '审核成功',
          type: 'success'
        })
        emit('handleUpdateOrgInfo')
      } else {
        ElNotification({
          title: '审核结果',
          message: res.data.message,
          type: 'error'
        })
      }
    }
  })
}

const init = async () => {
  try {
    const res = await getIndustry()
    res.data.code === 200 ? (industryList.value = res.data.data) : ''
  } catch (e) {
    console.log(e)
  }
}

init()
</script>

<style scoped lang="scss">
.application-form-container {
  width: 100%;
  .a-f-header {
    @apply flex items-center justify-start;
    flex-wrap: wrap;
    border-radius: 8px;
    background: #e5ecf7;
    margin-bottom: 60px;
    img {
      width: 110px;
      height: 95px;
      margin-right: 30px;
    }
  }
  .a-f-title {
    color: #303133;
    font-size: 18px;
  }
}
</style>
