import { ESpaceCommercialType, ESpaceRightsType } from '@/enum/space'

export const SpaceRightsLimitTips = {
  [ESpaceRightsType.bot]: ['创建机器人个数已用完。', '如需创建更多，请联系产品顾问进一步了解。'],
  [ESpaceRightsType.quota]: [
    '电力值已用完。',
    '如需更多电力值继续会话，请联系产品顾问进一步了解。'
  ],
  [ESpaceRightsType.paintQuota]: ['图像值已用完。', '如需更多图像值，请联系产品顾问进一步了解。'],
  [ESpaceRightsType.usage]: ['使用时间已到期。', '如需继续使用本产品，请联系产品顾问进一步了解。'],
  [ESpaceRightsType.space]: [
    '空间成员名额已满。',
    '如需继续使用本产品，请联系产品顾问进一步了解。'
  ],
  [ESpaceRightsType.groupChatFree]: [
    '升级后可创建群聊。',
    '如需继续创建群聊，请联系产品顾问进一步了解。'
  ],
  [ESpaceRightsType.groupChat]: [
    '群聊个数已用完。',
    '如需创建更多群聊，请联系产品顾问进一步了解。'
  ],
  [ESpaceRightsType.brand]: ['当前版本不可使用该功能。', '如需使用，请联系产品顾问进一步了解。'],
  [ESpaceRightsType.default]: ['如需版本升级，请联系产品顾问。']
}

// 付费权益版本
export const PaidCommercialTypes = [
  ESpaceCommercialType.brand,
  ESpaceCommercialType.professional,
  ESpaceCommercialType.customVip1,
  ESpaceCommercialType.customVip2,
  ESpaceCommercialType.customVip3,
  ESpaceCommercialType.ka
]

export const SpaceCommercialTypeMapper = {
  [ESpaceCommercialType.free]: '免费版',
  [ESpaceCommercialType.standard]: '标准版',
  [ESpaceCommercialType.brand]: '品牌版',
  [ESpaceCommercialType.professional]: '旗舰版',
  [ESpaceCommercialType.customVip1]: '高级定制版',
  [ESpaceCommercialType.customVip2]: '高级定制版',
  [ESpaceCommercialType.customVip3]: '高级定制版',
  [ESpaceCommercialType.ka]: '专享版'
}
