import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { WebEnumConstructor } from '../../enum/type'
import type { IBaseField } from '../common/IBaseField'

/**
 * ### 字段配置
 *
 * @author Hamm.cn
 */
export interface IFieldConfig<K extends EnumKey = EnumKey> extends IBaseField {
  /**
   * ### 字段标题
   */
  label?: string

  /**
   * ### 配置字典
   */
  dictionary?: WebEnumConstructor<K>
}
