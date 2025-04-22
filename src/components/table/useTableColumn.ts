import type { Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { IModelConfig, ITableColumn } from '../../decorator'
import { computed, ref } from 'vue'
import { getModelConfig, getTableConfigList } from '../../decorator'

export function useTableColumn<E extends RootEntity>(params: {
  /**
   * 实体实例
   */
  entityInstance: E

  /**
   * 自定义字段
   */
  customColumns: Array<ITableColumn<E>>

  /**
   * 字段缓存key
   */
  columnCacheKey?: string

  /**
   * 隐藏字段选择器
   */
  hideColumnSelector: boolean

  /**
   * 模型配置
   */
  modelConfig: IModelConfig
}) {
  const {
    entityInstance,
    customColumns = [],
    hideColumnSelector = false,
    modelConfig = getModelConfig(entityInstance),
  } = params

  /**
   * 选择的字段
   */
  const selectKeys: Ref<string[]> = ref([])

  /**
   * # 所有的字段
   */
  const allColumnList: Ref<Array<ITableColumn<E>>> = ref([])

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
    allColumnList.value = getTableConfigList<E>(entityInstance).filter(item => !item.removed).map((item) => {
      if (item.money && !item.align) {
        item.align = 'right'
      }
      return item
    })
  }

  const showColumnList: Ref<ITableColumn<E>[]> = ref([])

  /**
   * # 字段选择器是否启用
   */
  const isColumnSelectorEnabled: Ref<boolean> = computed(() => {
    if (modelConfig.hideFieldSelector) {
      // 全局标记了隐藏
      return false
    }
    // 读取传入配置是否隐藏
    return !hideColumnSelector
  })

  function updateSelectKeys(list: string[] = []) {
    console.log('updateSelectKeys', list)
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
