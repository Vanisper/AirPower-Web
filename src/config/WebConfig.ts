import type { WebMoneyDirection } from '../components'

export class WebConfig {
  static autoPermission = true
  static appKey = 'airpower'

  /**
   * ### 是否禁用权限
   *
   * - 如此项配置为 `true`, 则所有自动处理权限的功能都将失效。
   */
  static disablePermission = false

  /**
   * ### 金额方向 (向上取、向下取、四舍五入)
   */
  static moneyDirection: WebMoneyDirection = 'down'

  /**
   * ### 金额精度
   */
  static moneyPrecision = 2

  static pageSizes = [10, 20, 50, 100]
}
