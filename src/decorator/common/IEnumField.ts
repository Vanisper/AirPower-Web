import type { EnumConstructor } from '@airpower/enum'
import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { WebEnum } from '../../enum'

/**
 * ### 字典字段
 *
 * @author Hamm.cn
 */
export interface IEnumField<K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>> {
  /**
   * ### 配置字典
   */
  dictionary?: EnumConstructor<K, E>
}
