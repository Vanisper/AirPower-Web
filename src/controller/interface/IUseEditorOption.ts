import type { AirEntity } from '@airpower/core'
import type { IDetailControllerOption } from './IDetailControllerOption'

/**
 * # 编辑控制器的可选配置
 *
 * @author Hamm.cn
 */
export interface IUseEditorOption<E extends AirEntity> extends IDetailControllerOption<E> {
  /**
   * ### 编辑成功的提示消息
   */
  successMessage?: string

  /**
   * ### 请求前拦截器
   * 参数为发起请求的数据,请处理后返回
   *
   * @param submitData 实体
   */
  beforeSubmit?: (submitData: E) => E | null

  /**
   * ### 请求添加的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForAdd`
   */
  apiUrlAdd?: string

  /**
   * ### 请求更新的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForUpdate`
   */
  apiUrlUpdate?: string
}
