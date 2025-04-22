import { WebConfig } from '../../config'
import { FeedbackUtil } from '../feedback'
import { Http } from '../http'

/**
 * # 文件助手类
 * @author Hamm.cn
 */
export class WebFileUtil {
  /**
   * ### 获取静态文件的绝对地址
   * @param url 地址
   */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      const message = '文件地址不能为空'
      FeedbackUtil.alertError(message)
      throw new Error(message)
    }
    if (url.includes(Http.PREFIX_HTTP) || url.includes(Http.PREFIX_HTTPS)) {
      return url
    }
    return WebConfig.staticUrl + url
  }
}
