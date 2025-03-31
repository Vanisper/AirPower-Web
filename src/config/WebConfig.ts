import { CoreConfig } from '@airpower/core'

/**
 * # 全局配置
 * @author Hamm.cn
 */
export class WebConfig {
  /**
   * ### 获取AccessToken
   */
  static getAccessToken() {
    return localStorage.getItem(CoreConfig.authorizationHeaderKey)?.toString() || ''
  }

  /**
   * ### 设置AccessToken
   * @param accessToken AccessToken
   */
  static setAccessToken(accessToken: string): void {
    localStorage.setItem(CoreConfig.authorizationHeaderKey, accessToken)
  }

  /**
   * ### 移除AccessToken
   */
  static removeAccessToken(): void {
    localStorage.removeItem(CoreConfig.authorizationHeaderKey)
  }
}
