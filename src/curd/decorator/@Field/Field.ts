import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { DecoratorTarget } from '@airpower/transformer'
import type { RootModel } from '../../../base'
import type { WebEnumConstructor } from '../../../util'
import type { IFieldConfig } from './IFieldConfig'
import type { FieldConfigOptionalKey } from './type'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Field]`

/**
 * ### 为属性标记配置
 * @param config 配置项
 */
export function Field<K extends EnumKey = EnumKey>(config: FieldConfigOptionalKey<IFieldConfig<K>> = {}) {
  return (target: DecoratorTarget, key: string) => {
    config.key = key
    DecoratorUtil.setFieldConfig(target, key, KEY, config)
  }
}

/**
 * ### 获取属性的配置
 * @returns 配置对象
 * @param target 目标类
 * @param key 属性名
 */
export function getFieldConfig<M extends RootModel, K extends EnumKey = EnumKey>(target: M, key: string): IFieldConfig<K> {
  return (DecoratorUtil.getFieldConfig(target, key, KEY, true) || {}) as IFieldConfig<K>
}

/**
 * ### 获取属性的枚举字典
 * @param target 目标类
 * @param key 属性名
 */
export function getDictionary<M extends RootModel, K extends EnumKey = EnumKey>(target: M, key: string): WebEnumConstructor<K> | undefined {
  return getFieldConfig<M, K>(target, key)?.dictionary
}

/**
 * ### 获取属性的标题
 * @param target 目标类
 * @param key string 属性名
 */
export function getFieldLabel<M extends RootModel>(target: M, key: string): string {
  return getFieldConfig<M>(target, key)?.label || key
}
