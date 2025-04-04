import { HttpConfig } from '@airpower/core'

/**
 * # 身份令牌工具类
 *
 * @author Hamm.cn
 */
export class WebAccessToken {
  /**
   * ### 获取AccessToken
   */
  static getAccessToken() {
    return localStorage.getItem(HttpConfig.authorizationHeaderKey)?.toString() || ''
  }

  /**
   * ### 设置AccessToken
   * @param accessToken AccessToken
   */
  static setAccessToken(accessToken: string): void {
    localStorage.setItem(HttpConfig.authorizationHeaderKey, accessToken)
  }

  /**
   * ### 移除AccessToken
   */
  static removeAccessToken(): void {
    localStorage.removeItem(HttpConfig.authorizationHeaderKey)
  }
}
