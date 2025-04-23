import type { DecoratorTarget } from '@airpower/transformer'
import type { RootModel } from '../../../base'
import type { FieldConfigOptionalKey } from '../@Field'
import type { ITableColumn } from './ITableColumn'
import { DecoratorUtil } from '@airpower/transformer'

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
export function Table(config: FieldConfigOptionalKey<ITableColumn, 'key'> = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    DecoratorUtil.setFieldConfig(target, key, KEY, config)
  }
}

/**
 * ### 获取对象的属性表格的配置
 * @param target 目标对象
 * @param key 属性名
 */
export function getTableConfig<M extends RootModel>(target: M, key: string): ITableColumn {
  const tableConfig = DecoratorUtil.getFieldConfig(target, key, KEY, true)
  if (!tableConfig) {
    return { key }
  }
  return tableConfig
}

/**
 * ### 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList<M extends RootModel>(target: M): string[] {
  return DecoratorUtil.getFieldList(target, LIST_KEY)
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param target 目标实体类
 * @param keyList 字段列表
 */
export function getTableConfigList<M extends RootModel>(target: M, keyList: string[] = []): Array<ITableColumn> {
  if (keyList.length === 0) {
    keyList = getTableFieldList<M>(target)
  }
  const list = keyList.map(key => getTableConfig(target, key))
  return list.sort((a, b) => (b.order || 0) - (a.order || 0))
}
