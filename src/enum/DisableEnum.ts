import { WebColor } from './WebColor'
import { WebEnum } from './WebEnum'

/**
 * ### 禁用状态枚举
 *
 * @author Hamm.cn
 */
export class DisableEnum extends WebEnum<boolean> {
  /**
   * ### 禁用
   */
  static DISABLED = new DisableEnum(true, '禁用')
    .setColor(WebColor.DANGER)

  /**
   * ### 启用
   */
  static ENABLE = new DisableEnum(false, '启用')
    .setColor(WebColor.SUCCESS)
}
