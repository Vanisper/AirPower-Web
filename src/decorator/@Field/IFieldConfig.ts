import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { RootModel } from '../../base'
import type { WebEnum } from '../../enum'
import type { IBaseField, IEnumField } from '../common'

/**
 * # 字段配置
 *
 * @author Hamm.cn
 */
export interface IFieldConfig<M extends RootModel = any, K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>> extends IBaseField<M>, IEnumField<K, E> {
}
