import type { DecoratorTarget, ITransformerConstructor, Transformer } from '@airpower/transformer'
import type { IModelConfig } from './IModelConfig'
import { DecoratorUtil } from '@airpower/transformer'

const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[MODEL]`

/**
 * ### 为模型类标记配置项
 * @param config 配置项
 */
export function Model<
  T extends IModelConfig = IModelConfig,
>(
  config: T = {} as T,
) {
  return (target: DecoratorTarget) => DecoratorUtil.setClassConfig(target, KEY, config)
}

/**
 * ### 获取模型类配置项
 * @param TargetClass 目标类
 */
export function getModelConfig<
  E extends Transformer,
  T extends IModelConfig = IModelConfig,
>(
  TargetClass: ITransformerConstructor<E>,
): T {
  return DecoratorUtil.getClassConfig(TargetClass, KEY, {}, true) as T
}

/**
 * ### 获取模型类名称
 * @param TargetClass 目标类
 */
export function getModelName<
  E extends Transformer,
>(
  TargetClass: ITransformerConstructor<E>,
): string {
  return getModelConfig(TargetClass).label || TargetClass.name
}
