import request from '@/utils/request'

export function getMyOrgs() {
  // return Promise.resolve({ data: {} })
  // return Promise.resolve({ data: dataMyOrgs })

  return request({
    url: `/chato/api/users/me/orgs`
  })
}

export function getOrgDetail(orgId) {
  // return Promise.reject({ response: { status: 403 } })
  // return Promise.resolve({ data: {} })
  // return Promise.resolve({ data: dataOrgDetail })

  return request({
    url: `/chato/api/orgs/${orgId}`
  })
}
