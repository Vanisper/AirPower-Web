import type { EnumKey } from '@airpower/enum'
import type { IWebEnum } from './IWebEnum'
import type { WebColorString } from './type'
import { Enum } from '@airpower/enum'

/**
 * ### 网页枚举封装
 *
 * @author Hamm.cn
 */
export class WebEnum<K extends EnumKey = number> extends Enum<K> implements IWebEnum<K> {
  color?: WebColorString
  disabled?: boolean

  /**
   * ### 设置颜色
   */
  setColor(color: WebColorString) {
    this.color = color
    return this
  }

  /**
   * ### 设置禁用
   */
  setDisabled(disabled: boolean = true) {
    this.disabled = disabled
    return this
  }
}
