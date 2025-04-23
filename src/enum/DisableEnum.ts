import {WebColor} from './WebColor'
import {WebEnum} from './WebEnum'

/**
 * ### 禁用状态枚举
 *
 * @author Hamm.cn
 */
export class DisableEnum extends WebEnum<boolean> {
    static DISABLED = new DisableEnum(true, '禁用')
        .setColor(WebColor.DANGER)

    static ENABLE = new DisableEnum(false, '启用')
        .setColor(WebColor.SUCCESS)
}
