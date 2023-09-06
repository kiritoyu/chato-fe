import request from '@/utils/request'

const PAGE_SIZE = 10

export function getOrgDashboardSummary(orgId, dateRangeParams) {
  return request({
    url: `/chato/api/questions/summary`,
    params: {
      org_id: orgId,
      ...dateRangeParams
    }
  })
}

export function getOrgDashboardQuestions(orgId, page, dateRangeParams) {
  return request({
    url: `/chato/api/questions/show`,
    params: {
      org_id: orgId,
      page,
      page_size: PAGE_SIZE,
      ...dateRangeParams
    }
  })
}

export function rateDashboardQuestion(id, score, isSuperman = false) {
  return request({
    method: 'post',
    url: `/chato/api/questions/${id}/score`,
    data: {
      score,
      extent: isSuperman ? 'total' : undefined
    }
  })
}
