import type { EnumConstructor, EnumKey } from '@airpower/enum'
import type { WebColor } from './WebColor'
import type { WebEnum } from './WebEnum'

/**
 * ### 颜色值
 */
export type WebColorString = WebColor | string

export type WebEnumConstructor<K extends EnumKey, E extends WebEnum<K> = WebEnum<K>> =
  typeof WebEnum<K>
  & EnumConstructor<K, E>
