import type { AirEntity, ClassConstructor, IJson } from '@airpower/core'
import type { AbstractWebService } from '../service'
import type { IUseSelectorOption, IUseSelectorResult } from './interface'
import { computed, ref } from 'vue'
import { WebI18n } from '../helper'
import { useBaseTable } from './useBaseTable'

/**
 * # 引入`Selector`使用的`Hook`
 * @param props `defineProps`的返回值
 * @param entityClass 实体类
 * @param serviceClass `Selector`使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useSelector<E extends AirEntity, S extends AbstractWebService<E>>(
  props: IJson,
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseSelectorOption<E> = {},
): IUseSelectorResult<E, S> {
  /**
   * ### 表格`Hook`返回对象
   */
  const result = useBaseTable(entityClass, serviceClass, option)

  /**
   * ### 选择器对话框的标题
   */
  const title = ref(WebI18n.get().SelectPlease || '请选择')

  result.selectList.value = props.selectList

  const disableConfirm = computed(() => props.isMultiple && result.selectList.value.length === 0)

  return Object.assign(result, {
    title,
    disableConfirm,
  })
}
