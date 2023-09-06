import type { ICustomerFormConfig, ICustomerFormUpdateStatus } from '@/interface/customerForm'
import request from '@/utils/request'

// 信息表单配置 - 获取最新表单
export function getLatestCustomerFormConfig(domain_id: number) {
  return request<ICustomerFormConfig>({
    method: 'get',
    url: `/chato/api/v1/forms/latest`,
    data: { domain_id }
  })
}

// 信息表单配置 - 获取表单配置
export function getCustomerFormConfig(formId: number | string) {
  return request<ICustomerFormConfig>({
    method: 'get',
    url: `/chato/api/v1/graph/forms/${formId}`
  })
}

// 信息表单配置 - 保存
export function saveCustomerFormConfig(params: ICustomerFormConfig) {
  return request<ICustomerFormConfig>({
    method: 'post',
    url: `/chato/api/v1/forms/save`,
    data: params
  })
}

// 信息表单配置 - 状态更新
export function updateCustomerFormConfigStatus(params: ICustomerFormUpdateStatus) {
  return request({
    method: 'post',
    url: `/chato/api/v1/graph/forms/save`,
    data: params
  })
}

// 信息表单配置 - 删除
export function deleteCustomerFormConfig(formId: number) {
  return request({
    method: 'delete',
    url: `/chato/api/v1/graph/forms/delete/${formId}`
  })
}

// 信息表单 - 保存
export function saveCustomerForm(params) {
  return request({
    method: 'post',
    url: `/chato/api/v1/graph/form_datas/save `,
    data: params
  })
}
