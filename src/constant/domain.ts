import { EDomainConversationMode, EDomainConversationModeArousalMethod } from '@/enum/domain'

export const DomainCategoryOptions = [
  {
    value: '数字分身',
    label: '数字分身'
  },
  {
    value: '数字员工',
    label: '数字员工'
  },
  {
    value: '营销助手',
    label: '营销助手'
  },
  {
    value: '办公写作',
    label: '办公写作'
  },
  {
    value: '创意灵感',
    label: '创意灵感'
  },
  {
    value: '行业顾问',
    label: '行业顾问'
  },
  {
    value: '生活方式',
    label: '生活方式'
  },
  {
    value: '人力资源',
    label: '人力资源'
  }
]

export const MidJourneyDomainSlug = import.meta.env.VITE_APP_MIDJOURNEY_DOMAIN_SLUG

export const DomainReplyToneOfVoice = [
  '亲切友好',
  '专业严谨',
  '热情积极',
  '幽默风趣',
  '活泼可爱',
  '条理清晰'
]

export const DomainReplyLanguage = [
  { label: '中文', value: 'zh' },
  { label: '英文', value: 'en' }
]

export const DomainReplyLength = [
  { label: '精简', value: 50 },
  { label: '适中', value: 200 },
  { label: '丰富', value: 500 }
]

export const DomainReplyParagraph = [
  { label: '不使用知识库', value: 0 },
  { label: '一段', value: 1 },
  { label: '二段', value: 2 },
  { label: '三段', value: 3 },
  { label: '四段', value: 4 }
]

export const DomainConversationModeOptions = [
  { label: '文字', value: EDomainConversationMode.text },
  { label: '语音', value: EDomainConversationMode.audio }
]

export const DomainConversationModeArousalMethodOptions = [
  { label: '主动触发', value: EDomainConversationModeArousalMethod.ActiveTrigger },
  { label: '自动识别语音', value: EDomainConversationModeArousalMethod.AutomaticSpeechRecognition }
] as const

export const DebugDomainSymbol = Symbol('temporary-debug-domain')
export const DomainEditSymbol = Symbol('domain-edit')
export const DomainHansLimitSymbol = Symbol('domain-hans-limit')
