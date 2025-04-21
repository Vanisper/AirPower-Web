import type { DecoratorTarget } from '@airpower/transformer'
import type { ITableColumn } from './ITableColumn'
import { DecoratorUtil } from '@airpower/transformer'
import { getFieldConfig } from '../@Field'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Table]`

/**
 * ### LIST KEY
 */
const LIST_KEY = `${DecoratorUtil.DecoratorKeyPrefix}[TableList]`

/**
 * ### 为属性标记是表格字段
 * @param config 表格列的配置
 */
export function Table(config: ITableColumn = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    return DecoratorUtil.setFieldConfig(target, key, KEY, config, LIST_KEY)
  }
}

/**
 * ### 获取对象的属性表格的配置
 * @param target 目标对象
 * @param key 属性名
 */
export function getTableConfig(target: DecoratorTarget, key: string): ITableColumn {
  const tableConfig: ITableColumn | null = DecoratorUtil.getFieldConfig(target, key, KEY, true)
  if (!tableConfig) {
    return {}
  }
  if (!tableConfig.dictionary) {
    const props = getFieldConfig(target, key)
    if (props && props.dictionary) {
      tableConfig.dictionary = props.dictionary
    }
  }
  return tableConfig
}

/**
 * ### 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList(target: DecoratorTarget): string[] {
  return DecoratorUtil.getFieldList(target, LIST_KEY)
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param target 目标实体类
 * @param keyList 字段列表
 */
export function getTableConfigList(target: DecoratorTarget, keyList: string[]): ITableColumn[] {
  if (keyList.length === 0) {
    keyList = getTableFieldList(target)
  }
  const list = keyList.map(key => getTableConfig(target, key))
  return list.sort((a, b) => (b.order || 0) - (a.order || 0))
    .map((item) => {
      const props = getFieldConfig(target, item.key!)
      item.label = item.label || props.label || item.key
      return item
    })
}
