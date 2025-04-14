import type { EnumConstructor, IField } from '@airpower/core'
import type { IElementTableColumn } from './IElementTableColumn'

/**
 * # 表格的字段配置接口
 *
 * @author Hamm.cn
 */
export interface ITableFieldConfig extends IField, IElementTableColumn {
  /**
   * ### 字典
   */
  enums?: EnumConstructor

  key?: string

  /**
   * ### 列排序
   * 越大越靠前
   */
  orderNumber?: number

  /**
   * ### 是否隐藏
   */
  hide?: boolean
}
