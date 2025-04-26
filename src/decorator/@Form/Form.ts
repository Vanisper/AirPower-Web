import type { ITransformerConstructor, TransformerField } from '@airpower/transformer'
import type { RootModel } from '../../model/RootModel'
import type { FieldConfigOptionalKey } from '../@Field/type'
import type { IFormField } from './IFormField'
import { DecoratorUtil } from '@airpower/transformer'
import { getFieldConfig } from '../@Field/Field'

/**
 * ### KEY
 */
const KEY = '[Form]'

/**
 * ### LIST KEY
 */
const LIST_KEY = '[FormList]'

/**
 * ### 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Form<
  M extends RootModel,
>(
  config: FieldConfigOptionalKey<IFormField> = {},
) {
  return (
    instance: M,
    key: keyof M,
  ) => {
    config.key = key.toString()
    DecoratorUtil.setFieldConfig(instance, key, KEY, config, LIST_KEY)
  }
}

/**
 * ### 获取对象某个字段标记的表单配置项
 * @param Class 目标类
 * @param field 属性名
 */
export function getFormConfig<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  field: TransformerField<M>,
): IFormField {
  const formConfig = DecoratorUtil.getFieldConfig(Class, field.toString(), KEY, true)
  if (!formConfig) {
    return { key: field.toString() }
  }
  if (!formConfig.dictionary) {
    const props = getFieldConfig(Class, field)
    if (props && props.dictionary) {
      formConfig.dictionary = props.dictionary
    }
  }
  return formConfig
}

/**
 * ### 获取标记了表单配置的字段列表
 * @param Class 目标类
 */
export function getFormFieldList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): Array<TransformerField<M>> {
  return DecoratorUtil.getFieldList(Class, LIST_KEY) as Array<TransformerField<M>>
}

/**
 * ### 获取指定类的表单字段配置项列表
 * @param Class 目标类
 * @param fieldList 选择字段列表
 */
export function getFormConfigList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  fieldList: Array<TransformerField<M>> = [],
): IFormField[] {
  if (fieldList.length === 0) {
    fieldList = getFormFieldList(Class)
  }
  const list = fieldList.map(field => getFormConfig(Class, field))
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
