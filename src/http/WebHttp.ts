import type { AxiosRequestConfig } from 'axios'
import { AbstractHttp, CoreConfig, HttpResponse } from '@airpower/core'
import axios from 'axios'
import { WebConfig } from '../config'

/**
 * # 网络请求类
 * @author Hamm.cn
 */
export class WebHttp extends AbstractHttp {
  getAccessToken(): string {
    return WebConfig.getAccessToken()
  }

  async request(body?: unknown): Promise<HttpResponse> {
    const axiosConfig: AxiosRequestConfig = {}
    axiosConfig.url = this.getUrl()
    axiosConfig.headers = this.getHttpHeaders()
    axiosConfig.timeout = this.getTimeout()
    axiosConfig.method = this.getMethod()
    axiosConfig.data = body
    const response = new HttpResponse()
    try {
      const res = await axios.request(axiosConfig)
      if (res.status !== CoreConfig.successCode) {
        response.code = res.status
        response.message = res.statusText
        response.data = res
        return response
      }
      response.code = res.data.code
      response.message = res.data.message
      response.data = res.data.data
      return response
    }
    catch (e) {
      response.code = CoreConfig.defaultErrorCode
      response.message = (e as Error).message
      response.data = e
      return response
    }
  }
}
