import type { AirDecoratorTarget } from '@airpower/core'
import type { ITableFieldConfig } from './config'
import { AirDecorator, getFieldConfig } from '@airpower/core'

/**
 * ### 表格字段 `key`
 */
const FIELD_CONFIG_KEY = 'Table'

/**
 * ### 表格字段列表key
 */
const FIELD_LIST_KEY = 'TableList'

/**
 * ### 为属性标记是表格字段
 * @param config 表格列的配置
 */
export function Table(config: ITableFieldConfig = {}) {
  config.dictionary = AirDecorator.getDictionary(config.dictionary)
  return (target: AirDecoratorTarget, key: string) => {
    config.key = key
    return AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, config, FIELD_LIST_KEY)
  }
}

/**
 * ### 获取对象的属性表格的配置
 * @param target 目标对象
 * @param key 属性名
 */
export function getTableConfig(target: AirDecoratorTarget, key: string): ITableFieldConfig | null {
  const formConfig = AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
  if (!formConfig.dictionary) {
    const props = getFieldConfig(target, key)
    formConfig.dictionary = AirDecorator.getDictionary(props.dictionary)
  }
  return formConfig
}

/**
 * ### 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList(target: AirDecoratorTarget): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param target 目标实体类
 * @param keyList 字段列表
 */
export function getTableConfigList(target: AirDecoratorTarget, keyList: string[]): ITableFieldConfig[] {
  return AirDecorator.getFieldConfigList<ITableFieldConfig>(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList)
    .sort((a, b) => (b.orderNumber || 0) - (a.orderNumber || 0))
    .map((item) => {
      const props = getFieldConfig(target, item.key!)
      item.label = item.label || props.label || item.key
      if (!item.dictionary) {
        item.dictionary = AirDecorator.getDictionary(props.dictionary)
      }
      return item
    })
}
