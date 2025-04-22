import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { DecoratorTarget } from '@airpower/transformer'
import type { RootModel } from '../../base'
import type { WebEnum } from '../../enum'
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
export function Field<M extends RootModel = any, K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>>(config: IFieldConfig<M, K, E> = {}) {
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
export function getFieldConfig(target: DecoratorTarget, key: string): IFieldConfig {
  return (DecoratorUtil.getFieldConfig(target, key, KEY, true) || {}) as IFieldConfig
}
