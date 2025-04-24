import type { RootEntity } from '../../../model/RootEntity'
import type { AbstractCurdService } from '../../../service/AbstractCurdService'
import type { ITableResult } from '../list/ITableResult'

/**
 * # 树表格的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface ITableTreeResult<E extends RootEntity, S extends AbstractCurdService<E>>
  extends ITableResult<E, S> {
  /**
   * ### 表格行的添加按钮点击事件
   */
  onAddRow: (row: E) => void
}
