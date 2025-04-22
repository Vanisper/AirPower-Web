import type { ComputedRef, Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { IModelConfig, ITableColumn } from '../../decorator'
import { CryptoUtil } from '@airpower/util'
import { computed, ref } from 'vue'
import { WebConfig } from '../../config'
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
  hideColumnSelector?: boolean

  /**
   * 模型配置
   */
  modelConfig?: IModelConfig
}) {
  const {
    entityInstance,
    customColumns = [],
    columnCacheKey = CryptoUtil.base64Encode(window.location.pathname),
    hideColumnSelector = false,
    modelConfig = getModelConfig(entityInstance),
  } = params

  /**
   * 选择的字段
   */
  const selectColumnList: Ref<string[]> = ref([])

  const fullColumnCacheKey = `field_list_of_${WebConfig.appKey}_${entityInstance.constructor.name}_${columnCacheKey}`

  /**
   * # 显示字段选择器
   */
  const isColumnSelectorShow = ref(false)

  /**
   * # 所有的字段
   */
  const allColumnList: ComputedRef<Array<ITableColumn<E>>> = computed(() => {
    // 如果传入fieldList 优先使用fieldList
    if (customColumns.length > 0) {
      // 过滤没有隐藏且没有移除的列
      return customColumns
        .filter(item => !item.removed)
        .map((item) => {
          if (item.money && !item.align) {
            item.align = 'right'
          }
          return item
        })
    }

    return getTableConfigList<E>(entityInstance).filter(item => !item.removed).map((item) => {
      if (item.money && !item.align) {
        item.align = 'right'
      }
      return item
    })
  })

  /**
   * # 字段是否选择
   */
  function isColumnSelected(item: ITableColumn) {
    if (!item.key) {
      return false
    }
    return selectColumnList.value.includes(item.key)
  }

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

  /**
   * # 更新已选字段
   */
  function updateSelectedColumnList() {
    selectColumnList.value = []
    const fieldListCache: string[] = JSON.parse(localStorage.getItem(fullColumnCacheKey) || '[]')
    if (fieldListCache.length > 0 && !hideColumnSelector) {
      selectColumnList.value = fieldListCache
    }
  }

  /**
   * # 字段选择变更事件
   * @param status 是否即将选择
   * @param config 配置
   */
  function columnSelectChanged(status: boolean, config: ITableColumn) {
    if (config.force) {
      return
    }
    for (let i = 0; i < selectColumnList.value.length; i += 1) {
      if (config.key === selectColumnList.value[i]) {
        selectColumnList.value.splice(i, 1)
        break
      }
    }
    if (status) {
      selectColumnList.value.push(config.key!)
    }

    localStorage.setItem(fullColumnCacheKey, JSON.stringify(selectColumnList.value))
  }

  return {
    isColumnSelected,
    allColumnList,
    selectColumnList,
    isColumnSelectorShow,
    columnSelectChanged,
    isColumnSelectorEnabled,
    updateSelectedColumnList,
  }
}
