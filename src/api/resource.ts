import type { IResourceList } from '@/interface/resource'
import request from '@/utils/request'

// 获取全部对话
export function getResource() {
  return request<IResourceList[]>({
    method: 'get',
    url: '/chato/api/v1/domains/public_domain/all'
  })
}
