import type { ITransformerConstructor, TransformerField } from '@airpower/transformer'
import type { RootModel } from '../../model/RootModel'
import type { FieldConfigOptionalKey } from '../@Field/type'
import type { ITableColumn } from './ITableColumn'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY = '[Table]'

/**
 * ### 为属性标记是表格字段
 * @param config 表格列的配置
 */
export function Table<
  M extends RootModel,
>(
  config: FieldConfigOptionalKey<ITableColumn> = {},
) {
  return (
    instance: M,
    field: keyof M,
  ) => {
    config.key = field.toString()
    DecoratorUtil.setFieldConfig(instance, field, KEY, config)
  }
}

/**
 * ### 获取对象的属性表格的配置
 * @param Class 目标类
 * @param field 属性名
 */
export function getTableConfig<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  field: TransformerField<M>,
): ITableColumn {
  return DecoratorUtil.getFieldConfig(Class, field, KEY, true) || {}
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param Class 目标类
 */
export function getTableConfigList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): Array<ITableColumn> {
  const fieldList = Object.keys(Class.prototype)
  const list = fieldList.map(field => getTableConfig(Class, field)).filter(item => !!item.key)
  return list.sort((a, b) => (b.order || 0) - (a.order || 0))
}
