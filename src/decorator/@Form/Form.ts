import type { ITransformerConstructor, TransformerField } from '@airpower/transformer'
import type { RootModel } from '../../model/RootModel'
import type { FieldConfigOptionalKey } from '../@Field/type'
import type { IFormField } from './IFormField'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY = '[Form]'

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
    DecoratorUtil.setFieldConfig(instance, key, KEY, config)
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
  return DecoratorUtil.getFieldConfig(Class, field.toString(), KEY, true) || {}
}

/**
 * ### 获取指定类的表单字段配置项列表
 * @param Class 目标类
 */
export function getFormConfigList<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): IFormField[] {
  const fieldList = Object.keys(new Class())
  const list = fieldList.map(field => getFormConfig(Class, field)).filter(item => !!item.key)
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
