import type { EnumKey } from '@airpower/enum'
import type { WebColor } from './WebColor'
import type { WebEnum } from './WebEnum'

/**
 * ### 颜色值
 */
export type WebColorString = WebColor | string

export type WebEnumConstructor<K extends EnumKey = EnumKey> =
  typeof WebEnum<K>
