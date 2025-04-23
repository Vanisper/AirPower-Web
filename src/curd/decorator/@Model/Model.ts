import type { DecoratorTarget } from '@airpower/transformer'
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
 * @param target 目标类
 */
export function getModelConfig<T extends IModelConfig = IModelConfig>(target: DecoratorTarget): T {
  return DecoratorUtil.getClassConfig(target, KEY, {}, true) as T
}
