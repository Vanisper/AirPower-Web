import type {EnumKey} from '@airpower/enum/dist/enum/type'
import type {DecoratorTarget} from '@airpower/transformer'
import {DecoratorUtil} from '@airpower/transformer'
import type {WebEnum, WebEnumConstructor} from '../../enum'
import type {IFieldConfig} from './IFieldConfig'

/**
 * ### KEY
 */
const KEY = `${DecoratorUtil.DecoratorKeyPrefix}[Field]`

/**
 * ### 为属性标记配置
 * @param config 配置项
 */
export function Field<K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>>(config: IFieldConfig<K, E> = {}) {
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
export function getFieldConfig<K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>>(target: DecoratorTarget, key: string): IFieldConfig<K, E> {
    return (DecoratorUtil.getFieldConfig(target, key, KEY, true) || {}) as IFieldConfig<K, E>
}

/**
 * ### 获取属性的枚举字典
 * @param target 目标类
 * @param key 属性名
 */
export function getDictionary<K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>>(target: DecoratorTarget, key: string): WebEnumConstructor<K, E> | undefined {
    const result = getFieldConfig<K, E>(target, key)?.dictionary
    console.warn(`[Field] getDictionary() is deprecated, use getFieldConfig() instead.`, result, target, key)
    return result
}

/**
 * ### 获取属性的标题
 * @param target 目标类
 * @param key string 属性名
 */
export function getFieldLabel(target: DecoratorTarget, key: string): string {
    return getFieldConfig(target, key)?.label || key
}
