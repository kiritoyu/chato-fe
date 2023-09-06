import request from '@/utils/request'

export function sendSmsCode(mobile, channel?: string) {
  return request({
    method: 'post',
    url: `/chato/api/auth/sendVerificationCode`,
    data: { mobile, channel }
  })
}

export function login(data) {
  return request({
    method: 'post',
    url: `/chato/api/v1/user/auth/login`,
    data
  })
}

export function checkChannel(params: { code: string }) {
  return request({
    url: `/chato/api/v1/inviter_channels/check_code`,
    params: params
  })
}
