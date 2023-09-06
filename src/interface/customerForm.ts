import type { ECustomerFormFieldType } from '@/enum/customerForm'

export interface ICustomerFormField {
  field_id?: string
  name: string
  type: ECustomerFormFieldType
  required: boolean
  sort: number
}

export interface ICustomerFormConfig {
  id?: number
  disabled?: number
  domain_id: number
  title: string
  fields: ICustomerFormField[]
  schema?: any
}

export interface ICustomerFormUpdateStatus {
  id: number
  disabled?: number // 是否启用：0 - 启用，1 - 关闭
  status?: number // 删除：0 - 删除，1 - 未删除
}
