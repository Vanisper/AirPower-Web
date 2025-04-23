import type { IEnum } from '@airpower/enum'
import type { EnumKey } from '@airpower/enum/dist/enum/type'
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
