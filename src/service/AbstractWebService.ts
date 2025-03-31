import type { AbstractHttp } from '@airpower/core'
import type { AirEntity } from 'airpower'
import { AbstractEntityService } from '@airpower/core'
import { message } from 'ant-design-vue'
import { WebHttp } from '../http'

/**
 * # 实体 `API` 服务超类
 * 包含了常用的增删改查等方法
 *
 * @param E 泛型实体类
 * @author Hamm.cn
 */
export abstract class AbstractWebService<E extends AirEntity> extends AbstractEntityService<E> {
  createHttp(url: string): AbstractHttp {
    return WebHttp.create(url, (error) => {
      message.error(error.message)
    })
  }

  protected showError(errorMessage: string) {
    message.error(errorMessage)
  }

  protected showSuccess(successMessage: string) {
    message.success(successMessage)
  }
}
