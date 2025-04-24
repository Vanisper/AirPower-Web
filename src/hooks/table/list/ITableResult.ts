import type { RootEntity } from '../../../model/RootEntity'
import type { AbstractCurdService } from '../../../service/AbstractCurdService'
import type { IBaseTableResult } from '../base/IBaseTableResult'

/**
 * # 表格的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface ITableResult<E extends RootEntity, S extends AbstractCurdService<E>>
  extends IBaseTableResult<E, S> {
  /**
   * ### 编辑事件
   *
   * @param row 选择的行
   */
  onEdit: (row: E) => void

  /**
   * ### 删除事件
   *
   * @param row 选择的行
   */
  onDelete: (row: E) => void

  /**
   * ### 禁用事件
   *
   * @param row 选择的行
   */
  onDisable: (row: E) => void

  /**
   * ### 启用事件
   *
   * @param row 选择的行
   */
  onEnable: (row: E) => void
}
