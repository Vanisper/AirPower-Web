import type { IFieldConfig } from '../@Field'
import type { IElementTableColumn } from './IElementTableColumn'

/**
 * # 表格的字段配置接口
 *
 * @author Hamm.cn
 */
export interface ITableColumn extends IFieldConfig, IElementTableColumn {
  /**
   * ### 列排序
   * 越大越靠前
   */
  order?: number

  /**
   * ### 是否隐藏
   */
  hide?: boolean

  /**
   * ### 是否强制显示
   */
  force?: boolean
}
