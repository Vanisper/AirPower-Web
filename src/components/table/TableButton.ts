import type { RootEntity } from '../../model/RootEntity'

/**
 * # 表格按钮
 * @author Hamm.cn
 */
export interface ITableButton<E extends RootEntity> {
  /**
   * ### 按钮标题
   */
  label: string

  /**
   * ### 按钮点击回调
   * @param row 行数据
   */
  click: (row: E) => void

  /**
   * ### 按钮是否禁用
   * @param row 行数据
   */
  disabled?: (row: E) => boolean

  /**
   * ### 是否是危险按钮
   */
  dangerButton?: boolean

  /**
   * ### 是否是警告按钮
   */
  warningButton?: boolean
}
