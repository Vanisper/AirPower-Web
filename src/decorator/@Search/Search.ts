import type { ITransformerConstructor, TransformerField } from '@airpower/transformer'
import type { RootModel } from '../../model/RootModel'
import type { FieldConfigOptionalKey } from '../@Field/type'
import type { ISearchField } from './ISearchField'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY = '[Search]'

/**
 * ### 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Search<
  M extends RootModel,
>(
  config: FieldConfigOptionalKey<ISearchField> = {},
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
 * ### 获取对象某个字段标记的搜索配置项
 * @param Class 目标类
 * @param field 属性名
 */
export function getSearchConfig<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  field: TransformerField<M>,
): ISearchField {
  return DecoratorUtil.getFieldConfig(Class, field, KEY, true) || {}
}

/**
 * ### 获取指定类的搜索字段配置项列表
 * @param Class 目标类
 */
export function getSearchConfigList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): ISearchField[] {
  const fieldList = Object.keys(new Class())
  const list = fieldList.map(field => getSearchConfig(Class, field)).filter(item => !!item.key)
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
