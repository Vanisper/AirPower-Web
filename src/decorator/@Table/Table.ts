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
 * ### LIST KEY
 */
const LIST_KEY = '[TableList]'

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
    DecoratorUtil.setFieldConfig(instance, field, KEY, config, LIST_KEY)
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
  const tableConfig = DecoratorUtil.getFieldConfig(Class, field, KEY, true)
  if (!tableConfig) {
    return { key: field.toString() }
  }
  return tableConfig
}

/**
 * ### 获取标记了表格配置的字段列表
 * @param Class 目标类
 */
export function getTableFieldList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): Array<TransformerField<M>> {
  return DecoratorUtil.getFieldList(Class, LIST_KEY) as Array<TransformerField<M>>
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param Class 目标类
 * @param fieldList 字段列表
 */
export function getTableConfigList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  fieldList: Array<TransformerField<M>> = [],
): Array<ITableColumn> {
  if (fieldList.length === 0) {
    fieldList = getTableFieldList<M>(Class)
  }
  const list = fieldList.map(field => getTableConfig(Class, field))
  return list.sort((a, b) => (b.order || 0) - (a.order || 0))
}
