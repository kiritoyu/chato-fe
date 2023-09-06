import { FULL_SITE_NAME, SITE_NAME } from '@/constant/common'

export default function usePageTitle(titleSegments, { trimTail = false } = {}) {
  if (!Array.isArray(titleSegments)) titleSegments = [titleSegments]
  titleSegments = titleSegments.filter(Boolean)

  let result
  if (titleSegments.length === 0) {
    result = FULL_SITE_NAME
  } else {
    if (!trimTail) titleSegments.push(SITE_NAME)
    result = titleSegments.join(' - ')
  }
  document.title = result
}
