import type { AirEntity, ClassConstructor, IJson } from '@airpower/core'
import type { Ref } from 'vue'
import type { AbstractWebService } from '../service'
import type { IUseDetailOption, IUseDetailResult } from './interface'
import { AirClassTransformer } from '@airpower/core'
import { ref } from 'vue'
import { WebI18n } from '../helper'

/**
 * # 引入详情的`Hook`
 * @param props `defineProps` 的返回值
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的 `Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useDetail<E extends AirEntity, S extends AbstractWebService<E>>(
  props: IJson,
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseDetailOption<E> = {},
): IUseDetailResult<E, S> {
  /**
   * ### 加载状态
   */
  const isLoading = ref(false)

  /**
   * ### 传入的 `Service` 对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  /**
   * ### 表单对象
   */
  const formData: Ref<E> = ref(props.param ? props.param.copy() : AirClassTransformer.newInstance(entityClass))

  /**
   * ### 显示的对话框标题
   */
  const title = ref(WebI18n.get().Detail || '详情')

  /**
   * ### 查询详情方法
   */
  async function getDetail() {
    if (formData.value.id) {
      formData.value = await service.getDetail(formData.value.id, option.apiUrl)

      if (option.afterGetDetail) {
        const result = option.afterGetDetail(formData.value)
        if (result !== undefined) {
          formData.value = result
        }
      }
    }
  }

  getDetail()

  return {
    title,
    formData,
    isLoading,
    service,
    getDetail,
  }
}
