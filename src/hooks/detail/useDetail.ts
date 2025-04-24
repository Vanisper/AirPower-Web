import type { IJson } from '@airpower/transformer'
import type { Ref } from 'vue'
import type { RootEntity } from '../../model/RootEntity'
import type { AbstractCurdService } from '../../service/AbstractCurdService'
import type { CurdServiceConstructor } from '../../service/type'
import type { IDetailOption } from './IDetailOption'
import type { IDetailResult } from './IDetailResult'
import { Transformer } from '@airpower/transformer'
import { provide, ref } from 'vue'
import { WebI18n } from '../../i18n/WebI18n'

/**
 * # 引入详情的`Hook`
 * @param props `defineProps` 的返回值
 * @param ServiceClass 详情使用的 `Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useDetail<E extends RootEntity, S extends AbstractCurdService<E>>(
  props: IJson,
  ServiceClass: CurdServiceConstructor<E, S>,
  option: IDetailOption<E> = {},
): IDetailResult<E, S> {
  /**
   * ### 加载状态
   */
  const isLoading = ref(false)

  /**
   * ### 传入的 `Service` 对象
   */
  const service: S = Transformer.newInstance(ServiceClass)
  service.loading = isLoading

  /**
   * ### 表单对象
   */
  const formData: Ref<E> = ref(props.param ? props.param.copy() : Transformer.newInstance(service.entityClass))

  /**
   * ### 显示的对话框标题
   */
  const title = ref(WebI18n.get().Detail)

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

  provide('entityClass', service.entityClass)
  provide('formData', formData)

  getDetail()

  return {
    title,
    formData,
    isLoading,
    service,
    getDetail,
  }
}
