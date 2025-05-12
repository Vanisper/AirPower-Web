import { WebConfig } from '../config/WebConfig'
import { WebConstant } from '../config/WebConstant'

/**
 * ### 文件助手类
 * @author Hamm.cn
 */
export class WebFileUtil {
  /**
   * ### 获取静态文件的绝对地址
   * @param url 地址
   */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      throw new Error('文件地址不能为空')
    }
    if (url.includes(WebConstant.PREFIX_HTTP) || url.includes(WebConstant.PREFIX_HTTPS)) {
      return url
    }
    return WebConfig.staticUrl + url
  }
}
