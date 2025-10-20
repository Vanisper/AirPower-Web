import type { ITransformerConstructor } from '@airpower/transformer'
import type { Ref } from 'vue'
import type { HttpResponse } from '../http/HttpResponse'
import { Transformer } from '@airpower/transformer'
import { WebConfig } from '../config/WebConfig'
import { FeedbackUtil } from '../feedback/FeedbackUtil'
import { Http } from '../http/Http'

/**
 * ### `API` 服务超类
 * @author Hamm.cn
 */
export abstract class AbstractService extends Transformer {
  /**
   * ### `API` 目录地址
   * 一般对应后端的 `分组/控制器/目录` 等
   */
  abstract baseUrl: string

  /**
   * ### `Loading`
   * 你可以将这个传入的对象绑定到你需要 `Loading` 的 `DOM` 上
   */
  loading!: Ref<boolean>

  /**
   * ### 静态创建一个 `API` 服务实例
   * @param loading `可选` Loading
   */
  static create<S extends AbstractService>(this: ITransformerConstructor<S>, loading?: Ref<boolean>): S {
    const service: S = Object.assign(new this()) as S
    if (loading) {
      service.loading = loading
    }
    return service
  }

  /**
   * ### 创建一个 `HTTP` 实例
   * @param url 请求的接口地址
   * @param baseUrl `可选` 请求的接口目录
   */
  protected api(url: string, baseUrl?: string): Http {
    return Http.create(`${baseUrl || this.baseUrl}/${url}`, {
      loading: (isLoading: boolean): void => {
        if (this.loading) {
          this.loading.value = isLoading
        }
      },
      error: (response: HttpResponse): void => {
        if (response.code === WebConfig.unAuthorizeCode) {
          window.location.replace(WebConfig.loginUrl)
          return
        }
        FeedbackUtil.toastError(response.message)
      },
    })
  }
}
