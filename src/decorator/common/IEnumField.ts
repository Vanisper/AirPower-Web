import type { EnumConstructor } from '@airpower/enum'
import type { Enum } from '@airpower/enum/dist/enum/Enum'
import type { EnumKey } from '@airpower/enum/dist/enum/type'

/**
 * ### 字典字段
 *
 * @author Hamm.cn
 */
export interface IEnumField<K extends EnumKey = number, E extends Enum<K> = Enum<K>> {
  /**
   * ### 配置字典
   */
  dictionary?: EnumConstructor<K, E>
}
