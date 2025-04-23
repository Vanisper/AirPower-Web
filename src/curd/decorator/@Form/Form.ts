import type { DecoratorTarget, ITransformerConstructor } from '@airpower/transformer'
import type { RootModel } from '../../../base'
import type { FieldConfigOptionalKey } from '../@Field'
import type { IFormField } from './IFormField'
import { DecoratorUtil } from '@airpower/transformer'
import { getFieldConfig } from '../@Field'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Form]`

/**
 * ### LIST KEY
 */
const LIST_KEY = `${DecoratorUtil.DecoratorKeyPrefix}[FormList]`

/**
 * ### 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Form(config: FieldConfigOptionalKey<IFormField> = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    DecoratorUtil.setFieldConfig(target, key, KEY, config)
  }
}

/**
 * ### 获取对象某个字段标记的表单配置项
 * @param TargetClass 目标类
 * @param key 属性名
 */
export function getFormConfig<
  M extends RootModel,
>(TargetClass: ITransformerConstructor<M>, key: keyof M): IFormField {
  const formConfig = DecoratorUtil.getFieldConfig(TargetClass, key.toString(), KEY, true)
  if (!formConfig) {
    return { key: key.toString() }
  }
  if (!formConfig.dictionary) {
    const props = getFieldConfig(TargetClass, key)
    if (props && props.dictionary) {
      formConfig.dictionary = props.dictionary
    }
  }
  return formConfig
}

/**
 * ### 获取标记了表单配置的字段列表
 * @param TargetClass 目标类
 */
export function getFormFieldList<M extends RootModel>(TargetClass: ITransformerConstructor<M>): Array<keyof M> {
  return DecoratorUtil.getFieldList(TargetClass, LIST_KEY) as Array<keyof M>
}

/**
 * ### 获取指定类的表单字段配置项列表
 * @param TargetClass 目标类
 * @param keyList 选择字段列表
 */
export function getFormConfigList<
  M extends RootModel,
>(TargetClass: ITransformerConstructor<M>, keyList: Array<keyof M> = []): IFormField[] {
  if (keyList.length === 0) {
    keyList = getFormFieldList(TargetClass)
  }
  const list = keyList.map(key => getFormConfig(TargetClass, key))
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
