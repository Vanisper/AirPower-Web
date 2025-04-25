import type { DecoratorTarget, ITransformerConstructor } from '@airpower/transformer'
import type { RootModel } from '../../model/RootModel'
import type { FieldConfigOptionalKey } from '../@Field/type'
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
export function Table(
  config: FieldConfigOptionalKey<ITableColumn> = {},
) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    DecoratorUtil.setFieldConfig(target, key, KEY, config, LIST_KEY)
  }
}

/**
 * ### 获取对象的属性表格的配置
 * @param TargetClass 目标类
 * @param key 属性名
 */
export function getTableConfig<
  M extends RootModel,
>(
  TargetClass: ITransformerConstructor<M>,
  key: keyof M | string,
): ITableColumn {
  const instance = new TargetClass()
  const tableConfig = DecoratorUtil.getFieldConfig(instance, key.toString(), KEY, true)
  if (!tableConfig) {
    return { key: key.toString() }
  }
  return tableConfig
}

/**
 * ### 获取标记了表格配置的字段列表
 * @param TargetClass 目标类
 */
export function getTableFieldList<
  M extends RootModel,
>(
  TargetClass: ITransformerConstructor<M>,
): Array<keyof M | string> {
  return DecoratorUtil.getFieldList(TargetClass, LIST_KEY) as Array<keyof M | string>
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param TargetClass 目标类
 * @param keyList 字段列表
 */
export function getTableConfigList<
  M extends RootModel,
>(
  TargetClass: ITransformerConstructor<M>,
  keyList: Array<keyof M | string> = [],
): Array<ITableColumn> {
  if (keyList.length === 0) {
    keyList = getTableFieldList<M>(TargetClass)
  }
  const list = keyList.map(key => getTableConfig(TargetClass, key))
  return list.sort((a, b) => (b.order || 0) - (a.order || 0))
}
