import type { IBaseField } from '../common'

/**
 * # 表单的字段配置接口
 * @author Hamm.cn
 */
export interface ISearchField extends IBaseField {
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
