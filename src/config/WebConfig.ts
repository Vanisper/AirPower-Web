import type { MoneyDirection } from '../components'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { HttpHeader, HttpStatus } from '../util'

/**
 * # 全局配置
 *
 * @author Hamm.cn
 */
export class WebConfig {
  /**
   * ### 应用标识
   */
  static appKey = 'AirPower'

  /**
   * ### 是否自动处理权限前缀
   */
  static autoPermissionPrefix = true

  /**
   * ### 最大文本域长度
   */
  static maxTextAreaLength = 200

  /**
   * ### 最大文本长度
   */
  static maxTextLength = 50

  /**
   * ### 文本域的最小行数
   */
  static textareaMinRows = 3

  /**
   * ### 文本域的最大行数
   */
  static textareaMaxRows = 6

  /**
   * ### 上传地址
   */
  static uploadUrl = '/upload'

  /**
   * ### 是否禁用权限
   *
   * - 如此项配置为 `true`, 则所有自动处理权限的功能都将失效。
   */
  static disablePermission = false

  /**
   * ### 金额方向 (向上取、向下取、四舍五入)
   */
  static moneyDirection: MoneyDirection = 'down'

  /**
   * ### 金额精度
   */
  static moneyPrecision = 2

  /**
   * ### 每页显示条数可选项
   */
  static pageSizes = [10, 20, 50, 100]

  /**
   * ### 默认的上传文件名称
   */
  static uploadFileName = 'file'

  /**
   * ### element-plus 语言包
   */
  static elementPlusLocale = zhCn

  /**
   * ### 接口根地址
   * 以 `/` 结尾
   */
  static apiUrl = '/api/'

  /**
   * ### 最大数字
   */
  static maxNumber = 999999999

  /**
   * ### 最小数字
   */
  static minNumber = 0

  /**
   * ### `AccessToken` 对应的 `Key`
   */
  static authorizationHeaderKey: string = HttpHeader.AUTHORIZATION

  /**
   * ### 全局 `http` 请求返回 成功状态码
   */
  static successCode: number = HttpStatus.OK

  /**
   * ### 全局 `http` 请求返回 登录状态码
   */
  static unAuthorizeCode: number = HttpStatus.UNAUTHORIZED

  /**
   * ### 超时时间 毫秒
   * 超时后请求会自动断开并抛出异常
   */
  static timeout = 5000

  /**
   * ### 导出模板地址
   */
  static importTemplateUrl = '/export/template'

  /**
   * ### 导入API地址
   */
  static importUrl = '/import'

  /**
   * ### 导出API地址
   */
  static exportUrl = '/export'

  /**
   * ### 导出查询API地址
   */
  static exportQueryUrl = '/queryExport'

  /**
   * ### 静态资源地址
   */
  static staticUrl = '/static'

  /**
   * ### 登录地址
   */
  static loginUrl = '/login'

  /**
   * ### 小数精度位数
   */
  static numberPrecision = 2

  /**
   * ### 是否超时
   */
  static isTimeout = false

  /**
   * ### 产品名称
   */
  static product = 'AirPower'

  /**
   * ### 获取 `AccessToken`
   */
  static getAccessToken(): string {
    return localStorage.getItem(this.authorizationHeaderKey) || ''
  }

  /**
   * ### 移除 `AccessToken`
   */
  static removeAccessToken() {
    localStorage.removeItem(this.authorizationHeaderKey)
  }
}
