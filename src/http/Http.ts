import type { IJson, ITransformerConstructor } from '@airpower/transformer'
import type { AxiosRequestConfig } from 'axios'
import type { HttpHeaderRecord } from './type'
import { Transformer } from '@airpower/transformer'
import axios from 'axios'
import { WebConfig } from '../config/WebConfig'
import { WebConstant } from '../config/WebConstant'
import { HttpContentType } from './enum/HttpContentType'
import { HttpHeader } from './enum/HttpHeader'
import { HttpMethod } from './enum/HttpMethod'
import { HttpStatus } from './enum/HttpStatus'
import { HttpResponse } from './HttpResponse'

/**
 * ### 网络请求类
 *
 * @author Hamm.cn
 */
export class Http {
  /**
   * ### 请求方法
   */
  private method = HttpMethod.POST

  /**
   * ### URL
   */
  private url = ''

  /**
   * ### 请求超时时间
   */
  private timeout = WebConfig.timeout

  /**
   * ### 是否携带 `Cookies`
   */
  private widthCookie = false

  /**
   * ### 请求头
   */
  private headers: HttpHeaderRecord = {}

  /**
   * ### 错误回调
   */
  private errorHandler?: (error: HttpResponse) => void

  /**
   * ### 加载回调
   */
  private loadingHandler?: (loading: boolean) => void

  /**
   * ### 是否直接抛出错误
   */
  private isThrowError = false

  /**
   * ### 创建一个客户端
   * @param url 请求的 `URL`
   * @param handlers 监听器
   * @param handlers.error 错误
   * @param handlers.loading 加载
   */
  static create(url: string, handlers: {
    error?: (error: HttpResponse) => void
    loading?: (loading: boolean) => void
  } = {}): Http {
    const http = new Http()
    if (url.includes(WebConstant.PREFIX_HTTP) || url.includes(WebConstant.PREFIX_HTTPS)) {
      http.url = url
    }
    else {
      http.url = WebConfig.apiUrl + url
    }
    http.headers[HttpHeader.CONTENT_TYPE] = HttpContentType.JSON
    http.headers[WebConfig.authorizationHeaderKey] = WebConfig.getAccessToken()
    http.errorHandler = handlers.error
    http.loadingHandler = handlers.loading
    return http
  }

  /**
   * ### 设置请求超时时间
   * @param timeout 超时毫秒数
   */
  setTimeout(timeout: number) {
    this.timeout = timeout
    return this
  }

  /**
   * ### 设置请求头
   * @param header 请求头
   */
  setHttpHeader(header: Record<HttpHeader | string, unknown>): this {
    this.headers = header
    return this
  }

  /**
   * ### 允许携带 `Cookies`
   */
  withCredentials(): this {
    this.widthCookie = true
    return this
  }

  /**
   * ### 添加一个请求头
   * @param key 请求头 `key`
   * @param value 请求头 `value`
   */
  addHttpHeader(key: HttpHeader | string, value: string): this {
    this.headers[key] = value
    return this
  }

  /**
   * ### 设置请求方法
   * @param method 请求方法
   */
  setMethod(method: HttpMethod): this {
    this.method = method
    return this
  }

  /**
   * ### 设置请求`content-shared`
   * @param contentType `content-shared`
   */
  setContentType(contentType: HttpContentType): this {
    return this.addHttpHeader(HttpHeader.CONTENT_TYPE, contentType)
  }

  /**
   * ### 发送请求并获取转换后的模型
   * @param postData 请求的数据
   * @param parseClass 返回的模型
   */
  async post<REQ extends Transformer, RES extends Transformer>(
    postData: REQ | REQ[] | undefined,
    parseClass: ITransformerConstructor<RES>,
  ): Promise<RES> {
    const result = await this.request(postData)
    return Transformer.parse(result, parseClass)
  }

  /**
   * ### 发送请求并获取转换后的模型数组
   * @param postData 请求的数据
   * @param parseClass 返回的模型数组
   */
  async postArray<REQ extends Transformer, RES extends Transformer>(
    postData: REQ | REQ[] | undefined,
    parseClass: ITransformerConstructor<RES>,
  ): Promise<RES[]> {
    const result = await this.request(postData)
    return (result as IJson[]).map(item => Transformer.parse(item, parseClass))
  }

  /**
   * ### 是否直接抛出错误
   * @param isThrowError 是否回调错误
   */
  throwError(isThrowError = true): this {
    this.isThrowError = isThrowError
    return this
  }

  /**
   * ### POST 发送模型/模型数组并
   * @param postData 发送的数据模型(数组)
   */
  async request<T extends Transformer>(postData?: T | T[]): Promise<IJson | IJson[]> {
    let body = {}
    if (postData) {
      if (Array.isArray(postData)) {
        body = postData.map(item => item.toJson())
      }
      else {
        body = postData.toJson()
      }
    }
    this.setMethod(HttpMethod.POST)
    return new Promise((resolve, reject) => {
      if (this.loadingHandler) {
        this.loadingHandler(true)
      }
      this.send(body).then((response) => {
        if (response.code === WebConfig.unAuthorizeCode) {
          // 需要登录
          if (this.isThrowError || !this.errorHandler) {
            reject(response)
            return
          }
          this.errorHandler(response)
          return
        }
        if (response.code !== WebConfig.successCode) {
          if (this.isThrowError || !this.errorHandler) {
            reject(response)
            return
          }
          this.errorHandler(response)
          return
        }
        resolve(response.data as any)
      }).catch((e) => {
        const error = new HttpResponse()
        error.message = e.message
        error.code = HttpStatus.INTERNAL_SERVER_ERROR
        if (this.isThrowError || !this.errorHandler) {
          reject(error)
          return
        }
        this.errorHandler(error)
      }).finally(() => {
        if (this.loadingHandler) {
          this.loadingHandler(false)
        }
      })
    })
  }

  /**
   * ### 发送请求
   *
   * @param body `可选` 请求体
   * @see request() 直接发送 `POST`
   * @see get() 直接发送 `GET`
   */
  private async send(body?: unknown): Promise<HttpResponse> {
    const axiosConfig: AxiosRequestConfig = {}
    axiosConfig.url = this.url
    axiosConfig.headers = this.headers as IJson
    axiosConfig.timeout = this.timeout
    axiosConfig.method = this.method
    axiosConfig.data = body
    axiosConfig.withCredentials = this.widthCookie
    const response = new HttpResponse()
    try {
      const res = await axios.request(axiosConfig)
      if (res.status !== HttpStatus.OK) {
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
      response.code = HttpStatus.INTERNAL_SERVER_ERROR
      response.message = (e as Error).message
      response.data = e
      return response
    }
  }
}
