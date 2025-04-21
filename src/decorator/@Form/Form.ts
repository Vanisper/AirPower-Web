import type { DecoratorTarget } from '@airpower/transformer'
import type { IFormField } from './IFormField'
import { DecoratorUtil } from '@airpower/transformer'
import { getFieldConfig } from '../@Field'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Table]`

/**
 * ### LIST KEY
 */
const LIST_KEY = `${DecoratorUtil.DecoratorKeyPrefix}[TableList]`

/**
 * ### 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Form(config: IFormField = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    return DecoratorUtil.setFieldConfig(target, key, KEY, config, LIST_KEY)
  }
}

/**
 * ### 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getFormConfig(target: DecoratorTarget, key: string): IFormField {
  const formConfig: IFormField | null = DecoratorUtil.getFieldConfig(target, key, KEY, true)
  if (!formConfig) {
    return {}
  }
  if (!formConfig.dictionary) {
    const props = getFieldConfig(target, key)
    if (props && props.dictionary) {
      formConfig.dictionary = props.dictionary
    }
  }
  return formConfig
}

/**
 * ### 获取标记了表单配置的字段列表
 * @param target 目标对象
 */
export function getFormFieldList(target: DecoratorTarget): string[] {
  return DecoratorUtil.getFieldList(target, LIST_KEY)
}

/**
 * ### 获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getFormConfigList(target: DecoratorTarget, keyList: string[]): IFormField[] {
  if (keyList.length === 0) {
    keyList = getFormFieldList(target)
  }
  const list = keyList.map(key => getFormConfig(target, key))
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
    .map((item) => {
      const props = getFieldConfig(target, item.key!)
      item.label = item.label || props.label || item.key
      return item
    })
}
