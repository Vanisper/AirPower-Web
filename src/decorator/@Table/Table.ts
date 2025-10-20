import type { ITransformerConstructor, TransformerField } from '@airpower/transformer'
import type { RootEntity } from '../../model/RootEntity'
import type { FieldConfigOptionalKey } from '../@Field/type'
import type { ITableColumn } from './ITableColumn'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY: string = '[Table]'

/**
 * ### 为属性标记是表格字段
 * @param config 表格列的配置
 */
export function Table<
  E extends RootEntity,
>(
  config: FieldConfigOptionalKey<ITableColumn<E>> = {},
) {
  return (
    instance: E,
    field: keyof E,
  ): void => {
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
  E extends RootEntity,
>(
  Class: ITransformerConstructor<E>,
  field: TransformerField<E>,
): ITableColumn<E> {
  return DecoratorUtil.getFieldConfig(Class, field, KEY, true) || {}
}

/**
 * ### 获取字段标记的表格字段配置列表
 * @param Class 目标类
 */
export function getTableConfigList<
  E extends RootEntity,
>(
  Class: ITransformerConstructor<E>,
): Array<ITableColumn<E>> {
  const fieldList: string[] = Object.keys(new Class())
  return fieldList.map((field: string) => getTableConfig(Class, field))
    .filter((item: ITableColumn<E>) => !!item.key && !item.removed)
    .sort((a: ITableColumn<E>, b: ITableColumn<E>) => (b.order || 0) - (a.order || 0))
}
