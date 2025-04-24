import type { EnumKey, IEnum } from '@airpower/enum'
import type { WebColorString } from './type'

export interface IWebEnum<K extends EnumKey = number> extends IEnum<K> {
  /**
   * ### 颜色
   */
  color?: WebColorString

  /**
   * ### 是否禁用
   */
  disabled?: boolean
}
