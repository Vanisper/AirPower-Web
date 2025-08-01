import type { DateTimeFormatter, DesensitizeType } from '@airpower/util'
import type { IBaseField } from '../common/IBaseField'
import type { IElementTableColumn } from './IElementTableColumn'

/**
 * ### 表格的字段配置接口
 *
 * @author Hamm.cn
 */
export interface ITableColumn extends IBaseField, IElementTableColumn {
  /**
   * ### 是否是金额
   */
  money?: boolean

  /**
   * ### 是否是电话号码
   */
  phone?: boolean

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
   * ### 是否强制换行
   */
  wrap?: boolean

  /**
   * ### 是否是负载对象的字段
   * 请确保该属性对应的类型已经实现了 `IPayload` 接口
   */
  payload?: boolean

  /**
   * ### 是否是列表类数据
   */
  array?: boolean

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
   * ### 是否是图片列
   */
  image?: boolean

  /**
   * ### 图片宽度
   */
  imageWidth?: number

  /**
   * ### 图片高度
   */
  imageHeight?: number

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
