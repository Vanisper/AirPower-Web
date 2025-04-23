import type { DecoratorTarget, ITransformerConstructor } from '@airpower/transformer'
import type { RootModel } from '../../../base'
import type { FieldConfigOptionalKey } from '../@Field'
import type { ISearchField } from './ISearchField'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Search]`

/**
 * ### LIST KEY
 */
const LIST_KEY = `${DecoratorUtil.DecoratorKeyPrefix}[SearchList]`

/**
 * ### 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Search(config: FieldConfigOptionalKey<ISearchField> = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    DecoratorUtil.setFieldConfig(target, key, KEY, config)
  }
}

/**
 * ### 获取对象某个字段标记的搜索配置项
 * @param TargetClass 目标类
 * @param key 属性名
 */
export function getSearchConfig<M extends RootModel>(TargetClass: ITransformerConstructor<M>, key: keyof M): ISearchField {
  const instance = new TargetClass()
  const formConfig: ISearchField | null = DecoratorUtil.getFieldConfig(instance, key.toString(), KEY, true)
  if (!formConfig) {
    return { key: key.toString() }
  }
  return formConfig
}

/**
 * ### 获取标记了搜索配置的字段列表
 * @param TargetClass 目标类
 */
export function getSearchFieldList<M extends RootModel>(TargetClass: ITransformerConstructor<M>): Array<keyof M> {
  return DecoratorUtil.getFieldList(TargetClass, LIST_KEY) as Array<keyof M> as Array<keyof M>
}

/**
 * ### 获取指定类的搜索字段配置项列表
 * @param TargetClass 目标类
 * @param keyList 选择字段列表
 */
export function getSearchConfigList<M extends RootModel>(TargetClass: ITransformerConstructor<M>, keyList: Array<keyof M> = []): ISearchField[] {
  if (keyList.length === 0) {
    keyList = getSearchFieldList<M>(TargetClass)
  }
  const list = keyList.map(key => getSearchConfig(TargetClass, key))
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
