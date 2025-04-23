import type { DecoratorTarget, Transformer } from '@airpower/transformer'
import type { IModelConfig } from './IModelConfig'
import { DecoratorUtil } from '@airpower/transformer'

const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[MODEL]`

/**
 * ### 为模型类标记配置项
 * @param config 配置项
 */
export function Model<T extends IModelConfig = IModelConfig>(config: T = {} as T) {
  return (target: DecoratorTarget) => DecoratorUtil.setClassConfig(target, KEY, config)
}

/**
 * ### 获取模型类配置项
 * @param target 实例
 */
export function getModelConfig<E extends Transformer, T extends IModelConfig = IModelConfig>(target: E): T {
  return DecoratorUtil.getClassConfig(target, KEY, {}, true) as T
}

/**
 * ### 获取模型类名称
 * @param target 实例
 */
export function getModelName<E extends Transformer>(target: E): string {
  return getModelConfig(target).label || target.constructor.name
}
