import type { IDomainInfo } from './domain'

export interface IResourceList {
  icon?: string
  type: string
  data: IDomainInfo[]
}
