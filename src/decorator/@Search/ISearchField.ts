import type { IBaseField } from '../common'
import type { IEnumField } from '../common/IEnumField'

/**
 * # 表单的字段配置接口
 * @author Hamm.cn
 */
export interface ISearchField extends IBaseField, IEnumField {
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
}
