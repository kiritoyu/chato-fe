// xss攻击白名单
export const XSSOptions = {
  whiteList: {
    span: ['class'],
    p: ['class'],
    a: ['href', 'title', 'target']
  }
}
