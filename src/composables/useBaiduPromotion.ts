import qs from 'query-string'
import { ref } from 'vue'

export default function useBaiduPromotion() {
  const BAIDU_PROMOTION_KEY = 'chato-baidu-promotion'
  const BAIDU_PROMOTION_KEYWORD_KEY = 'chato-baidu-promotion-keyword'

  const bdId = ref('')
  const bdKeyword = ref('')

  const routerBdId = (qs.parseUrl(window.location.href).query.bd_vid as string) || ''
  const routerBdKeyword = (qs.parseUrl(window.location.href).query.keyword as string) || ''

  if (!bdId.value && routerBdId) {
    sessionStorage.setItem(BAIDU_PROMOTION_KEY, routerBdId)
  }
  if (!bdKeyword.value && routerBdKeyword) {
    sessionStorage.setItem(BAIDU_PROMOTION_KEYWORD_KEY, routerBdKeyword)
  }

  if (routerBdId && bdId.value !== routerBdId) {
    sessionStorage.removeItem(BAIDU_PROMOTION_KEY)
    sessionStorage.setItem(BAIDU_PROMOTION_KEY, routerBdId)
  }
  if (routerBdKeyword && bdKeyword.value !== routerBdKeyword) {
    sessionStorage.removeItem(BAIDU_PROMOTION_KEYWORD_KEY)
    sessionStorage.setItem(BAIDU_PROMOTION_KEYWORD_KEY, routerBdKeyword)
  }

  bdId.value = sessionStorage.getItem(BAIDU_PROMOTION_KEY) || ''
  bdKeyword.value = sessionStorage.getItem(BAIDU_PROMOTION_KEYWORD_KEY) || ''

  return {
    baiduPromotionId: bdId,
    baiduPromotionKeyword: bdKeyword
  }
}
