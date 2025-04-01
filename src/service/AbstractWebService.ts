import type { AbstractHttp } from '@airpower/core'
import { AbstractEntityService } from '@airpower/core'
import { message } from 'ant-design-vue'
import { WebHttp } from '../http'

type AirEntity = InstanceType<InstanceType<typeof AbstractEntityService>['entityClass']>

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

  protected showSuccess(successMessage: string) {
    message.success(successMessage)
  }

  protected showError(errorMessage: string) {
    message.error(errorMessage)
  }
}
