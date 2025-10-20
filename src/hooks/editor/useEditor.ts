import type { IJson } from '@airpower/transformer'
import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { RootEntity } from '../../model/RootEntity'
import type { AbstractCurdService } from '../../service/AbstractCurdService'
import type { CurdServiceConstructor } from '../../service/type'
import type { WebValidateRule } from '../../validator/type'
import type { IDetailResult } from '../detail/IDetailResult'
import type { IEditorOption } from './IEditorOption'
import type { IEditorResult } from './IEditorResult'
import { computed, ref, watch } from 'vue'
import { WebI18n } from '../../i18n/WebI18n'
import { WebValidator } from '../../validator/WebValidator'
import { useDetail } from '../detail/useDetail'

/**
 * ### 引入`Editor`的`Hook`
 * @param props `defineProps`的返回值
 * @param ServiceClass `Editor`使用的`Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useEditor<E extends RootEntity, S extends AbstractCurdService<E>>(
  props: IJson,
  ServiceClass: CurdServiceConstructor<E, S>,
  option: IEditorOption<E> = {},
): IEditorResult<E, S> {
  /**
   * ### 详情`Hook`返回对象
   */
  const result: IDetailResult<E, S> = useDetail(props, ServiceClass, option)

  /**
   * ### 对话框显示的标题
   */
  const title = computed(() => (result.formData.value.id ? WebI18n.get().Update : WebI18n.get().Add))

  /**
   * ### 自动生成的验证规则
   */
  const rules: WebValidateRule<E> = WebValidator.createRules(new ServiceClass(), option.customRules || {})

  /**
   * ### 表单实例
   */
  const formRef = ref<FormInstance>() as Ref<FormInstance>

  /**
   * ### 表单提交事件
   */
  async function onSubmit() {
    let postData = result.formData.value.copy()
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result === null) {
        return
      }
      postData = result
    }
    if (postData.id) {
      const id = await result.service.update(
        postData,
        option.successMessage || WebI18n.get().UpdateSuccess,
        option.apiUrlUpdate,
      )
      props.onConfirm(id)
      return
    }
    const id = await result.service.add(
      postData,
      option.successMessage || WebI18n.get().AddSuccess,
      option.apiUrlAdd,
    )
    props.onConfirm(id)
  }

  watch(
    result.formData,
    (): void => {
      formRef.value?.validate()
    },
    {
      deep: true,
      immediate: true,
    },
  )

  return Object.assign(result, {
    title,
    formRef,
    rules,
    onSubmit,
  }) as IEditorResult<E, S>
}
