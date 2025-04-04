import type { AirEntity } from '@airpower/core'
import type { AbstractWebService } from '../service'
import { WebI18n } from '../i18n'
import { DetailController } from './DetailController'

/**
 * # 编辑器控制器
 *
 * @author Hamm.cn
 */
export class EditorController<E extends AirEntity, S extends AbstractWebService<E>> extends DetailController<E, S> {
  async getDetail(): Promise<void> {
    this.title.value = this.formData.value.id ? WebI18n.get().Edit : WebI18n.get().Add
    return super.getDetail()
  }
}
