import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { WebEnum } from '../../enum'
import type { IBaseField, IEnumField } from '../common'

/**
 * # 表单的字段配置接口
 * @author Hamm.cn
 */
export interface ISearchField<
  K extends EnumKey = EnumKey,
  E extends WebEnum<K> = WebEnum<K>,
> extends IBaseField, IEnumField<K, E> {
  /**
   * ### 隐藏搜索
   */
  hide?: boolean

  /**
   * ### 排序
   * `越大越靠左边`
   */
  order?: number

  /**
   * ### 可筛选
   * 仅枚举字典下拉选择时有效
   */
  filterable?: boolean

  /**
   * ### 可清除
   */
  clearable?: boolean

  /**
   * ### 宽度
   */
  width?: number
}
