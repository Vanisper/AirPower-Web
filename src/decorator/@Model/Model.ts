import type { ITransformerConstructor } from '@airpower/transformer'
import type { RootModel } from '../../model/RootModel'
import type { IModelConfig } from './IModelConfig'
import { DecoratorUtil } from '@airpower/transformer'

const KEY = '[MODEL]'

/**
 * ### 为模型类标记配置项
 * @param config 配置项
 */
export function Model<
  M extends RootModel,
  T extends IModelConfig = IModelConfig,
>(
  config: T = {} as T,
) {
  return (Class: ITransformerConstructor<M>) => DecoratorUtil.setClassConfig(Class, KEY, config)
}

/**
 * ### 获取模型类配置项
 * @param Class 目标类
 */
export function getModelConfig<
  M extends RootModel,
  T extends IModelConfig = IModelConfig,
>(
  Class: ITransformerConstructor<M>,
): T {
  return DecoratorUtil.getClassConfig(Class, KEY, {}, true) as T
}

/**
 * ### 获取模型类名称
 * @param Class 目标类
 */
export function getModelName<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
): string {
  return getModelConfig(Class).label || Class.name
}
