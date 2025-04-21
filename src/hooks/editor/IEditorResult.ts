import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { AbstractCurdService } from '../../curd'
import type { WebValidateRule } from '../../util'
import type { IDetailResult } from '../detail'

/**
 * # `Editor` 的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IEditorResult<E extends RootEntity, S extends AbstractCurdService<E>>
  extends IDetailResult<E, S> {
  /**
   * ### 表单的 `Ref` 对象
   * 你可以绑定到组件中, 它将自动为你验证
   * - `ADialog` 的 `:form-ref`
   * - `el-form` 的 `ref`
   */
  formRef: Ref<FormInstance>

  /**
   * ### 表单的验证规则
   * 你可以绑定到 `el-form` 的 `:rules` 上
   */
  rules: WebValidateRule<E>

  /**
   * ### 表单提交的方法
   * 你可以使用 `beforeSubmit` 方法来拦截请求的数据
   */
  onSubmit: () => void
}
