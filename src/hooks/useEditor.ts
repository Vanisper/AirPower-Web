import type { AirEntity, ClassConstructor, IJson } from '@airpower/core'
import type { AbstractWebService } from '../service'
import type { IUseEditorOption, IUseEditorResult } from './interface'
import { AirClassTransformer } from '@airpower/core'
import { computed } from 'vue'
import { WebI18n } from '../helper'
import { useDetail } from './useDetail'

/**
 * # 引入`Editor`的`Hook`
 * @param props `defineProps`的返回值
 * @param entityClass `Editor`使用的实体类
 * @param serviceClass `Editor`使用的`Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useEditor<E extends AirEntity, S extends AbstractWebService<E>>(
  props: IJson,
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseEditorOption<E> = {},
): IUseEditorResult<E, S> {
  /**
   * ### 详情`Hook`返回对象
   */
  const result = useDetail(props, entityClass, serviceClass, option)

  /**
   * ### 对话框显示的标题
   */
  const title = computed(() => (result.formData.value.id ? WebI18n.get().Edit || '编辑' : WebI18n.get().Add || '添加'))

  /**
   * ### 表单提交事件
   */
  async function onSubmit() {
    let postData = AirClassTransformer.copy(result.formData.value, entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result === null) {
        return
      }
      postData = result
    }
    try {
      if (postData.id) {
        const id = await result.service.update(
          postData,
          option.successMessage || WebI18n.get().EditSuccess || '编辑成功',
          option.apiUrlUpdate,
        )
        props.onConfirm(id)
        return
      }
      const id = await result.service.add(
        postData,
        option.successMessage || WebI18n.get().AddSuccess || '添加成功',
        option.apiUrlAdd,
      )
      props.onConfirm(id)
    }
    catch (e: unknown) {
      console.warn(e)
    }
  }

  return Object.assign(result, {
    title,
    onSubmit,
  })
}
