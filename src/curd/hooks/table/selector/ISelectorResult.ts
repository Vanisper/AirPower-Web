import type { Ref } from 'vue'
import type { RootEntity } from '../../../../base'
import type { AbstractCurdService } from '../../../index'
import type { IBaseTableResult } from '../base'

/**
 * # 选择器 `Hook` 的标准返回
 * @author Hamm.cn
 */
export interface ISelectorResult<E extends RootEntity, S extends AbstractCurdService<E>>
  extends IBaseTableResult<E, S> {
  /**
   * ### `Selector` 的标题
   */
  title: Ref<string>

  /**
   * ### 是否禁用确认按钮
   * 多选时当没有选择任何数据时将禁用确认按钮
   */
  disableConfirm: Ref<boolean>
}
