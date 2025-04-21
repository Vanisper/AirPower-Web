import type { TableAlign, TableFixed, TableSortable } from './TableType'

/**
 * # ElementPlus支持的列配置项
 *
 * @autho Hamm.cn
 */
export interface IElementTableColumn {
  // 需要补充这些属性
  // type Column = typeof ElTable.TableColumn

  /**
   * ### 滚动时固定位置
   */
  fixed?: TableFixed

  /**
   * ### 列对齐方式
   */
  align?: TableAlign

  /**
   * ### 是否字段允许排序 `默认不排序`
   * `custom` 为自定义排序, `WebTable` 组件将触发 `onSortChange` 事件
   */
  sortable?: TableSortable

  /**
   * ### 列宽度
   */
  width?: string | number

  /**
   * ### 最小宽度
   */
  minWidth?: string
}
