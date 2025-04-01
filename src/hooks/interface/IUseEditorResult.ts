import type { AirEntity } from '@airpower/core'
import type { AbstractWebService } from '../../service'
import type { IUseDetailResult } from './IUseDetailResult'

/**
 * # `Editor` 的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IUseEditorResult<E extends AirEntity, S extends AbstractWebService<E>>
  extends IUseDetailResult<E, S> {
  /**
   * ### 表单提交的方法
   * 你可以使用 `beforeSubmit` 方法来拦截请求的数据
   */
  onSubmit: () => void
}
