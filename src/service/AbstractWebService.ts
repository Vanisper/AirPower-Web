import type { AbstractHttp, AirEntity } from '@airpower/core'
import type { ClassConstructor } from 'airpower'
import type { Ref } from 'vue'
import { AbstractEntityService } from '@airpower/core'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { WebHttp } from '../http'

/**
 * # 实体 `API` 服务超类
 * 包含了常用的增删改查等方法
 *
 * @param E 泛型实体类
 * @author Hamm.cn
 */
export abstract class AbstractWebService<E extends AirEntity> extends AbstractEntityService<E> {
  /**
   * ### 是否正在加载中
   */
  loading = ref(false)

  /**
   * ### 创建一个 `Service` 对象
   * @param loading 加载状态
   */
  static createWithLoading<S extends AbstractWebService<E>, E extends AirEntity>(this: ClassConstructor<S>, loading: Ref<boolean>): S {
    const service = super.create<S>()
    service.loading = loading
    return service
  }

  protected createHttp(url: string): AbstractHttp {
    const http = WebHttp.create(url, (error) => {
      ElMessage.error(error.message)
    })
    http.loading = this.loading
    return http
  }

  protected showSuccess(successMessage: string) {
    ElMessage.success(successMessage)
  }

  protected showError(errorMessage: string) {
    ElMessage.error(errorMessage)
  }
}
