import type { DecoratorTarget } from '@airpower/transformer'
import type { RootModel } from '../../../base'
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
export function Search(config: ISearchField = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    return DecoratorUtil.setFieldConfig(target, key, KEY, config, LIST_KEY)
  }
}

/**
 * ### 获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getSearchConfig<M extends RootModel>(target: M, key: string): ISearchField {
  const formConfig: ISearchField | null = DecoratorUtil.getFieldConfig(target, key, KEY, true)
  if (!formConfig) {
    return {}
  }
  return formConfig
}

/**
 * ### 获取标记了搜索配置的字段列表
 * @param target 目标对象
 */
export function getSearchFieldList<M extends RootModel>(target: M): string[] {
  return DecoratorUtil.getFieldList(target, LIST_KEY)
}

/**
 * ### 获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getSearchConfigList<M extends RootModel>(target: M, keyList: string[] = []): ISearchField[] {
  if (keyList.length === 0) {
    keyList = getSearchFieldList<M>(target)
  }
  const list = keyList.map(key => getSearchConfig(target, key))
  return list.filter(item => !item.hide)
    .sort((a, b) => (b.order || 0) - (a.order || 0))
}
