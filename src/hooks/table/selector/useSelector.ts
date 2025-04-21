import type { IJson } from '@airpower/transformer'
import type { RootEntity } from '../../../base'
import type { AbstractCurdService, CurdServiceConstructor } from '../../../curd'
import type { ISelectorOption } from './ISelectorOption'
import type { ISelectorResult } from './ISelectorResult'
import { computed, ref } from 'vue'
import { WebI18n } from '../../../i18n'
import { useBaseTable } from '../base'

/**
 * # 引入`Selector`使用的`Hook`
 * @param props `defineProps`的返回值
 * @param serviceClass `Selector`使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useSelector<E extends RootEntity, S extends AbstractCurdService<E>>(
  props: IJson,
  serviceClass: CurdServiceConstructor<E, S>,
  option: ISelectorOption<E> = {},
): ISelectorResult<E, S> {
  /**
   * ### 表格`Hook`返回对象
   */
  const result = useBaseTable(serviceClass, option)

  /**
   * ### 选择器对话框的标题
   */
  const title = ref(WebI18n.get().SelectPlease)

  result.selectList.value = props.selectList

  const disableConfirm = computed(() => props.isMultiple && result.selectList.value.length === 0)

  return Object.assign(result, {
    title,
    disableConfirm,
  })
}
