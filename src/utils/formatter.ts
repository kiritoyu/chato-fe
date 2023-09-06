export function formatPriceInFen(fen, decimal = 2) {
  decimal = Number.isInteger(decimal) ? decimal : 2
  const yuan = Number(fen) / 100
  return Number(yuan).toFixed(decimal)
}

export function toSimpleDate(str) {
  // '2024-03-21T21:59:12' => '2024-03-21'
  const temp = String(str).split('T')
  return temp[0]
}
export function toSimpleDateTime(str) {
  // '2024-03-21T21:59:12' => '2024-03-21 21:59'
  const temp = String(str).replace('T', ' ').split(':')
  temp.pop()
  return temp.join(':')
}

export function trimDecimal(number, decimal = 0, defaultText = '--') {
  if (typeof number !== 'number') {
    return defaultText
  }
  number = Number(number)
  return number.toFixed(decimal)
}

export const FILE_TYPE_NAMES = {
  editor: '在线文档',
  webpage: '网页',
  pdf: 'PDF',
  doc: 'Word',
  docx: 'Word',
  txt: 'txt',
  ppt: 'PPT',
  pptx: 'PPT',
  xls: 'Excel',
  xlsx: 'Excel'
}
export function getFileTypeName(type) {
  return FILE_TYPE_NAMES[type] || type || '-'
}

export const FILE_STATUS_NAMES = {
  all: '全部状态',
  pending: '待处理',
  parsing: '正在解析',
  learning: '学习中',
  learned: '学习完成',
  error: '学习失败'
}
export function getFileStatusName(status) {
  return FILE_STATUS_NAMES[status] || status || '-'
}
