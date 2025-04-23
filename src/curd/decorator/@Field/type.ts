import type { IFieldConfig } from './IFieldConfig'

/**
 * # 字段配置 `Key` 变为可选
 */
export type FieldConfigOptionalKey<T extends IFieldConfig> = Omit<T, 'key'> & {
  /**
   * ### 这个属性名你不用传入，你传了我也不认
   */
  key?: string
}
