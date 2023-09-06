import type { TPagingList } from '@/interface/common'
import type { IQuestionFilter } from '@/interface/question'
import type { IFormCollectDetailList, IFormCollectSelect } from '@/interface/report'
import { paramsSerializer } from '@/utils/help'
import request from '@/utils/request'

const pageSize = 20

export function getQuestionsSummary(orgId, domainId) {
  return request({
    url: `/chato/api/v1/statistics/questions/summary`,
    params: {
      org_id: orgId,
      domain_id: domainId,
      source: 'all'
    }
  })
}

export function getQuestions({
  domainId,
  source,
  evaluation,
  page,
  page_size,
  begin_time,
  end_time,
  mid_question_id,
  keyword
}: IQuestionFilter) {
  return request({
    url: `/chato/api/v1/statistics/questions/query`,
    params: {
      domain_id: domainId,
      source: source,
      page: page,
      evaluation: evaluation,
      page_size,
      begin_time: begin_time,
      end_time: end_time,
      mid_question_id,
      keyword
    }
  })
}

export function exportQuestions({ ids, domainId, midQuestionId }) {
  return request({
    method: 'post',
    responseType: 'arraybuffer',
    url: '/chato/api/v1/statistics/questions/export',
    data: {
      domain_id: domainId,
      ids: ids,
      mid_question_id: midQuestionId
    }
  })
}

/**
 * @function
 * @description 表单数据筛选
 * @params TPagingList
 * @returns { Promise<IFormCollectSelect[]> }
 */
export function getFormCollectSelect(params: TPagingList) {
  return request<IFormCollectSelect[]>({
    url: `/chato/api/v1/graph/forms?${paramsSerializer(params)}`
  })
}

/**
 * @function
 * @description 表单收集列表
 * @params TPagingList
 * @return { Promise<IFormCollectDetailList[]> }
 */
export function getFormCollectDetailList(params: TPagingList) {
  return request<IFormCollectDetailList[]>({
    url: `/chato/api/v1/graph/form_datas?${paramsSerializer(params)}`
  })
}

/**
 * @function
 * @description 导出表单收集
 * @params TPagingList
 * @return { Promise<ArrayBuffer> }
 */
export function exportFormCollectDetailList(params: TPagingList) {
  return request<ArrayBuffer>({
    url: `/chato/api/v1/graph/export/form_datas?${paramsSerializer(params)}`,
    responseType: 'arraybuffer'
  })
}
