import { WebColor } from './WebColor'
import { WebEnum } from './WebEnum'

/**
 * ### 禁用状态枚举
 *
 * @author Hamm.cn
 */
export class DisableEnum extends WebEnum {
  static ENABLE = new DisableEnum(0, '禁用')
    .setColor(WebColor.DANGER)

  static DISABLED = new DisableEnum(1, '启用')
    .setColor(WebColor.SUCCESS)
}
