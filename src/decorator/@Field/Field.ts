import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { ITransformerConstructor, TransformerField } from '@airpower/transformer'
import type { WebEnumConstructor } from '../../enum/type'
import type { RootModel } from '../../model/RootModel'
import type { IFieldConfig } from './IFieldConfig'
import type { FieldConfigOptionalKey } from './type'
import { DecoratorUtil } from '@airpower/transformer'

/**
 * ### KEY
 */
const KEY: string = '[Field]'

/**
 * ### 为属性标记配置
 * @param config 配置项
 */
export function Field<
  M extends RootModel,
  K extends EnumKey = EnumKey,
>(
  config: FieldConfigOptionalKey<IFieldConfig<K>> = {},
) {
  return (
    instance: M,
    field: keyof M,
  ): void => {
    config.key = field.toString()
    DecoratorUtil.setFieldConfig(instance, field, KEY, config)
  }
}

/**
 * ### 获取属性的配置
 * @returns 配置对象
 * @param Class 目标类
 * @param field 属性名
 */
export function getFieldConfig<
  M extends RootModel,
  K extends EnumKey = EnumKey,
>(
  Class: ITransformerConstructor<M>,
  field: TransformerField<M>,
): IFieldConfig<K> {
  return DecoratorUtil.getFieldConfig(Class, field.toString(), KEY, true) || {}
}

/**
 * ### 获取属性的枚举字典
 * @param Class 目标类
 * @param field 属性名
 */
export function getDictionary<
  M extends RootModel,
  K extends EnumKey = EnumKey,
>(
  Class: ITransformerConstructor<M>,
  field: TransformerField<M>,
): WebEnumConstructor<K> | undefined {
  return getFieldConfig<M, K>(Class, field)?.dictionary
}

/**
 * ### 获取属性的标题
 * @param Class 目标类
 * @param field string 属性名
 */
export function getFieldLabel<
  M extends RootModel,
>(
  Class: ITransformerConstructor<M>,
  field: TransformerField<M>,
): string {
  return getFieldConfig<M>(Class, field)?.label || field.toString()
}
