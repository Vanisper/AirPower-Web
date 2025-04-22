import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { WebEnum } from '../../enum'
import type { IBaseField, IEnumField } from '../common'

/**
 * # 字段配置
 *
 * @author Hamm.cn
 */
export interface IFieldConfig<K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>> extends IBaseField, IEnumField<K, E> {
}
