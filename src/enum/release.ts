export const enum AfficialAccountReplyModeType {
  sync = 'sync',
  async = 'async'
}

export const enum AfficialAccountStatusType {
  normal = 'normal',
  disabled = 'disabled',
  deleted = 'deleted'
}

export const enum EFeishuConfigStatus {
  refresh = 'refresh',
  load = 'load'
}

export const enum EWeixinConfigText {
  url = '回调URL',
  token = 'Token',
  encoding_aes_key = 'EncodingAESKey',
  app_id = '企业ID',
  app_secret = 'Secret'
}

export enum EWeixinConfigType {
  url = 'url',
  token = 'token',
  encoding_aes_key = 'encoding_aes_key',
  app_id = 'app_id',
  app_secret = 'app_secret'
}

export enum ETabPublicType {
  invite = 'invite',
  create = 'create'
}

export enum ECreatePublicType {
  edit = 'edit',
  invite = 'invite',
  friends = 'friends',
  create = 'create',
  transfer = 'transfer'
}

export const enum EChannelType {
  FEISHU = 'feishu',
  WECHAT_KF = 'wechat_kf',
  WECHAT_MP = 'wechat_mp',
  DOUYIN = 'douyin'
}

export enum EReleaseSettingExampleType {
  doc = 'doc',
  correct = 'correct',
  ad = 'ad'
}
