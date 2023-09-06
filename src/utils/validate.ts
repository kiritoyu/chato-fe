export const RE_MOBILE = /^1[3456789]\d{9}$/
export const RE_URL = /^https?:\/\/.+$/
export const RE_CODE = /^[0-9]{4}$/

export function validateMobile(str) {
  const mobile = String(str)
  return RE_MOBILE.test(mobile)
}
export function validateURL(str) {
  const mobile = String(str)
  return RE_URL.test(mobile)
}

export function validateCode(str) {
  const code = String(str)
  return RE_CODE.test(code)
}
