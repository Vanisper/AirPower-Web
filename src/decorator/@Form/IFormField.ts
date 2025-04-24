import type { DateTimeFormatter } from '@airpower/util'
import type { DateTimeType } from '../../components'
import type { IBaseField } from '../common/IBaseField'
import type { FormTrim } from './FormTrim'

/**
 * # 表单的字段配置接口
 * @author Hamm.cn
 */
export interface IFormField extends IBaseField {
  /**
   * ### 输入提示
   */
  placeholder?: string

  /**
   * ### 默认值
   */
  defaultValue?: string | number | boolean

  /**
   * ### 去除空格
   */
  trim?: FormTrim

  /**
   * ### 小数精度位数
   */
  precision?: number

  /**
   * ### 前置图标名称
   * 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  prefixIcon?: string

  /**
   * ### 后置图标名称
   * 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  suffixIcon?: string

  /**
   * ### 最大数字
   * 默认配置 `WebConfig.maxNumber` 仅在 `number` 时有效
   */
  max?: number

  /**
   * ### 最小数字
   */
  min?: number

  /**
   * ### 最大允许输入的长度
   * 手动指定后, `WebConfig.maxTextAreaLength` 和 `WebConfig.maxTextLength` 将失效
   */
  maxLength?: number

  /**
   * ### 最小长度
   */
  minLength?: number

  /**
   * ### 排序 越大越靠上
   */
  order?: number

  /**
   * ### 数字输入
   */
  number?: boolean

  /**
   * ### 是否是密码
   */
  password?: boolean

  /**
   * ### 是否是文本域
   */
  textarea?: boolean

  /**
   * ### 是否显示字数限制
   */
  showLimit?: boolean

  /**
   * ### 是否是纯中文
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  chinese?: boolean | string

  /**
   * ### 是否是手机号
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  mobilePhone?: boolean | string

  /**
   * ### 是否是座机电话
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  telPhone?: boolean | string

  /**
   * ### 是否是电子邮箱
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  email?: boolean | string

  /**
   * ### 是否是座机电话或手机
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  phone?: boolean | string

  /**
   * ### 是否必填(字符串类型)
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredString?: boolean | string

  /**
   * ### 是否必填(数字类型)
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredNumber?: boolean | string

  /**
   * ### 是否必填(挂载对象)
   * 支持传入 `boolean` 和 `string`
   * - 如传入 `有效字符串` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 `true` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredPayload?: boolean | string

  /**
   * ### 正则表达式对象
   */
  regExp?: RegExp

  /**
   * ### 是否隐藏表单字段
   * 如配置`true` 则`getFormFieldConfigList`将无法拿到这个属性
   */
  hide?: boolean

  /**
   * ### 日期类型
   */
  dateType?: DateTimeType

  /**
   * ### 日期显示格式化
   */
  dateShowFormatter?: DateTimeFormatter

  /**
   * ### 日期格式化
   */
  dateFormatter?: DateTimeFormatter

  /**
   * ### 是否可清除
   */
  clearable?: boolean

  /**
   * ### 后置文字
   * 优先级低于 `AInput` 的 `append` 插槽
   */
  suffixText?: string

  /**
   * ### 可多选
   */
  multiple?: boolean

  /**
   * ### 收起多选标签
   */
  collapseTags?: boolean

  /**
   * ### 可筛选
   * 如同时为 `AInput` 传入了 `onSearch` 回调方法, 则进行自定义的筛选
   */
  filterable?: boolean

  /**
   * ### 限制最多选择多少个
   * 配置 0 不限制, 默认不限制
   */
  multipleLimit?: number

  /**
   * ### 父子关联
   */
  checkStrictly?: boolean

  /**
   * ### 是否显示枚举字典的颜色灯
   * 如果显示 请确保传入的 `dictionary` 配置了 `color`
   */
  color?: boolean

  /**
   * ### 返回全路径的值
   */
  emitPath?: boolean

  /**
   * ### 显示全路径
   */
  showAllLevels?: boolean

  /**
   * ### TextArea是否自适应
   * `AInput`如配置了 `textarea:true` 此项生效, 默认为`true`
   * 如配置为 `false`, 可手动配置 `minRow` `maxRow` 等参数
   */
  autoSize?: boolean

  /**
   * ### 最小行数
   * 如配置了 `autoSize`, 则此项配置无效
   */
  minRows?: number

  /**
   * ### 最大行数
   * 如配置了 `autoSize`, 则此项配置无效
   */
  maxRows?: number

  /**
   * ### 使用 `Switch` 控件
   */
  switch?: boolean

  /**
   * ### 使用 `Radio` 控件
   */
  radio?: boolean

  /**
   * ### 使用 `Radio` 控件时用按钮的样式
   * `@Form` 的 `radio` 配置为 `true` 时生效
   */
  radioButton?: boolean
}
