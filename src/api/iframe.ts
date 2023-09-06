import type { createDeleteEditSitesData, createSitesRes } from '@/interface/release'
import request from '@/utils/request'

export function createDeleteEditSites(domain_slug: string, data: createDeleteEditSitesData) {
  return request({
    method: 'post',
    url: `/chato/api/share_channel/${domain_slug}/save`,
    data
  })
}

export function getCreateSites(domain_slug: string) {
  return request<createSitesRes>({
    url: `/chato/api/share_channel/${domain_slug}/get`
  })
}
