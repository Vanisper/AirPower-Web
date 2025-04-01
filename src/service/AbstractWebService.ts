import type { AbstractHttp, AirEntity } from '@airpower/core'
import { AbstractEntityService } from '@airpower/core'
import { ElMessage } from 'element-plus'
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
      ElMessage.error(error.message)
    })
  }

  protected showSuccess(successMessage: string) {
    ElMessage.success(successMessage)
  }

  protected showError(errorMessage: string) {
    ElMessage.error(errorMessage)
  }
}
