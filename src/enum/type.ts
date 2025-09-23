import type { EnumKey } from '@airpower/enum'
import type { WebColor } from './WebColor'
import type { WebEnum } from './WebEnum'

/**
 * ### 颜色值
 */
export type WebColorString = WebColor | string

/**
 * ### 网页枚举构造类型
 */
export type WebEnumConstructor<K extends EnumKey = EnumKey>
  = typeof WebEnum<K>
