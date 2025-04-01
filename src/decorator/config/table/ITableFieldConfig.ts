import type { AirDictionaryArray, AirEnum, ClassConstructor, IField } from '@airpower/core'
import type { IElementTableColumn } from './IElementTableColumn'

/**
 * # 表格的字段配置接口
 * @author Hamm.cn
 */
export interface ITableFieldConfig extends IField, IElementTableColumn {
  /**
   * ### 字典
   */
  dictionary?: ClassConstructor<AirEnum> | AirDictionaryArray

  key?: string

  /**
   * ### 列排序
   * 越大越靠前
   */
  orderNumber?: number
}
