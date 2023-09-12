import type { EUserOriganizationRole } from '@/enum/userInformation'

export interface IUserIdentity {
  organization_type?: EUserOriganizationRole
  surname?: string
  company?: string
}

export interface IFirstGuideSelectDataConfig extends IUserIdentity {
  industry: string[] | string
  interests: string[]
}
