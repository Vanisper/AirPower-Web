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
 * ### LIST KEY
 */
const LIST_KEY = '[SearchList]'

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
    DecoratorUtil.setFieldConfig(instance, field, KEY, config, LIST_KEY)
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
  const formConfig: ISearchField | null = DecoratorUtil.getFieldConfig(Class, field.toString(), KEY, true)
  if (!formConfig) {
    return { key: field.toString() }
  }
  return formConfig
}

/**
 * ### 获取标记了搜索配置的字段列表
 * @param Class 目标类
 */
export function getSearchFieldList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): Array<TransformerField<M>> {
  return DecoratorUtil.getFieldList(Class, LIST_KEY) as Array<TransformerField<M>>
}

/**
 * ### 获取指定类的搜索字段配置项列表
 * @param Class 目标类
 * @param fieldList 选择字段列表
 */
export function getSearchConfigList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  fieldList: Array<TransformerField<M>> = [],
): ISearchField[] {
  if (fieldList.length === 0) {
    fieldList = getSearchFieldList<M>(Class)
  }
  const list = fieldList.map(field => getSearchConfig(Class, field))
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
