import { ECustomerFormFieldType } from '@/enum/customerForm'

export const CustomerFormFieldTypeMapper = {
  [ECustomerFormFieldType.string]: '文本',
  [ECustomerFormFieldType.mobile]: '电话'
}

export const CustomerFormFieldTypeOptions = [
  { label: CustomerFormFieldTypeMapper.mobile, value: ECustomerFormFieldType.mobile },
  { label: CustomerFormFieldTypeMapper.string, value: ECustomerFormFieldType.string }
]
