import type { ITransformerConstructor } from '@airpower/transformer'
import type { Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { IModelConfig, ITableColumn } from '../../curd'
import { computed, ref } from 'vue'
import { getModelConfig, getTableConfigList } from '../../curd'

/**
 * # 表格字段
 *
 * @author Hamm.cn
 */
export function useTableColumn<E extends RootEntity>(params: {
  /**
   * ### 实体类
   */
  entityClass: ITransformerConstructor<E>

  /**
   * ### 自定义字段
   */
  customColumns: Array<ITableColumn>

  /**
   * ### 字段缓存key
   */
  columnCacheKey?: string

  /**
   * ### 隐藏字段选择器
   */
  hideColumnSelector: boolean

  /**
   * ### 模型配置
   */
  modelConfig: IModelConfig
}) {
  const {
    entityClass,
    customColumns = [],
    hideColumnSelector = false,
    modelConfig = getModelConfig(entityClass),
  } = params

  /**
   * ### 选择的字段
   */
  const selectKeys: Ref<string[]> = ref([])

  /**
   * ### 所有的字段
   */
  const allColumnList: Ref<Array<ITableColumn>> = ref([])

  if (customColumns.length > 0) {
    // 过滤没有隐藏且没有移除的列
    allColumnList.value = customColumns
      .filter(item => !item.removed)
      .map((item) => {
        if (item.money && !item.align) {
          item.align = 'right'
        }
        return item
      })
  }
  else {
    allColumnList.value = getTableConfigList(entityClass).filter(item => !item.removed).map((item) => {
      if (item.money && !item.align) {
        item.align = 'right'
      }
      return item
    })
  }

  /**
   * ### 显示的字段
   */
  const showColumnList: Ref<ITableColumn[]> = ref([])

  /**
   * ### 字段选择器是否启用
   */
  const isColumnSelectorEnabled: Ref<boolean> = computed(() => {
    if (modelConfig.hideFieldSelector) {
      // 全局标记了隐藏
      return false
    }
    // 读取传入配置是否隐藏
    return !hideColumnSelector
  })

  /**
   * ### 更新选中字段
   * @param list 选中的字段
   */
  function updateSelectKeys(list: string[] = []) {
    if (list.length === 0) {
      selectKeys.value = allColumnList.value.map(item => item.key as string)
    }
    else {
      selectKeys.value = list
    }
    showColumnList.value = allColumnList.value.filter(item => selectKeys.value.includes(item.key as string))
  }

  updateSelectKeys()

  return {
    updateSelectKeys,
    allColumnList,
    selectKeys,
    showColumnList,
    isColumnSelectorEnabled,
  }
}
