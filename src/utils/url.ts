export function join(base, path) {
  if (!base.endsWith('/')) base += '/'
  if (path.startsWith('/')) path = path.slice(1)
  return base + path
}

// 校验网页地址
export function isURL(strUrl) {
  const regular =
    /^(http|https):\/\/(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/\S*)?$/
  // var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/
  if (regular.test(strUrl)) {
    return true
  } else {
    return false
  }
}

export function html_encode(str) {
  let s = ''
  if (str.length == 0) return ''
  s = str.replace(/&/g, '&gt;')
  s = s.replace(/</g, '&lt;')
  s = s.replace(/>/g, '&gt;')
  s = s.replace(/ /g, '&nbsp;')
  s = s.replace(/\'/g, '&#39;')
  s = s.replace(/\"/g, '&quot;')
  s = s.replace(/\n/g, '<br>')
  return s
}

/**
 * @description 获取文件base64url
 * @param file
 * @returns
 */
export const getFileBase64 = function (file: Blob | File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result || '')
    reader.onerror = (error) => reject(error)
  })
}

// chato-ai.com/$request_url -> chato.cn/$request_url
export const locationComToCn = () => {
  const CHATO_URL = 'https://chato.cn'
  const hostname = window.location.hostname
  const request_url = window.location.pathname
  if (hostname.includes('chato-ai.com')) {
    location.replace(CHATO_URL + request_url)
  }
}
