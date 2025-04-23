import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { WebEnum, WebEnumConstructor } from '../../enum'
import type { IBaseField } from '../common'

/**
 * # 字段配置
 *
 * @author Hamm.cn
 */
export interface IFieldConfig<K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>> extends IBaseField {
  /**
   * ### 字段标题
   */
  label?: string

  /**
   * ### 配置字典
   */
  dictionary?: WebEnumConstructor<K, E>
}
