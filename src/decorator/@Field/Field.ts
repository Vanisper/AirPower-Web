import type { DecoratorTarget } from '@airpower/transformer'
import type { RootModel } from '../../base'
import type { IFieldConfig } from './IFieldConfig'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Field]`

/**
 * ### 为属性标记配置
 * @param config 配置项
 */
export function Field<M extends RootModel | string = string>(config: IFieldConfig<M> = {}) {
  return (target: DecoratorTarget, key: string) => {
    DecoratorUtil.setFieldConfig(target, key, KEY, config)
  }
}

/**
 * ### 获取属性的配置
 * @returns 配置对象
 * @param target 目标类
 * @param key 属性名
 */
export function getFieldConfig<M extends RootModel | string = string>(target: DecoratorTarget, key: string): IFieldConfig<M> {
  return (DecoratorUtil.getFieldConfig(target, key, KEY, true) || {}) as IFieldConfig<M>
}
