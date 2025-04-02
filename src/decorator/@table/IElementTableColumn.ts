import type { TableAlign, TableFixed, TableSortable } from './TableType'

/**
 * # ElementPlus支持的列配置项
 * @autho Hamm.cn
 */
export interface IElementTableColumn {
  // 需要补充这些属性
  // type Column = typeof ElTable.TableColumn

  fixed?: TableFixed

  align?: TableAlign

  sortable?: TableSortable

}
