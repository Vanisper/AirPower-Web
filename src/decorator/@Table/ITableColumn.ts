import type { EnumKey } from '@airpower/enum/dist/enum/type'
import type { DateTimeFormatter, DesensitizeType } from '@airpower/util'
import type { RootModel } from '../../base'
import type { WebEnum } from '../../enum'
import type { IFieldConfig } from '../@Field'
import type { IElementTableColumn } from './IElementTableColumn'

/**
 * # 表格的字段配置接口
 *
 * @author Hamm.cn
 */
export interface ITableColumn<M extends RootModel = any, K extends EnumKey = EnumKey, E extends WebEnum<K> = WebEnum<K>> extends IFieldConfig<M, K, E>, IElementTableColumn {
  /**
   * ### 是否是金额
   */
  money?: boolean

  /**
   * ### 列排序
   * 越大越靠前
   */
  order?: number

  /**
   * ### 是否隐藏
   */
  hide?: boolean

  /**
   * ### 是否强制显示
   */
  force?: boolean

  /**
   * ### 是否强制不换行
   */
  nowrap?: boolean

  /**
   * ### 删除列
   */
  removed?: boolean

  /**
   * ### 空值显示
   */
  emptyValue?: string

  /**
   * ### 后缀文本
   */
  suffixText?: string

  /**
   * ### 是否可复制
   */
  copy?: boolean

  /**
   * ### 前缀文本
   */
  prefixText?: string

  /**
   * ### 是否显示颜色状态灯
   */
  color?: boolean

  /**
   * ### 脱敏类型
   */
  desensitize?: DesensitizeType

  /**
   * ### 是否是日期时间
   */
  datetime?: boolean | DateTimeFormatter
}
