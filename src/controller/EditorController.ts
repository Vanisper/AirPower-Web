import type { AirEntity } from '@airpower/core'
import type { AbstractWebService } from '../service'
import { WebI18n } from '../helper'
import { DetailController } from './DetailController'

/**
 * # 编辑器控制器
 * @param props `defineProps` 的返回值
 * @param entityClass `Editor`使用的实体类
 * @param serviceClass `Editor`使用的`Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export class EditorController<E extends AirEntity, S extends AbstractWebService<E>> extends DetailController<E, S> {
  async getDetail(): Promise<void> {
    this.title.value = this.formData.value.id ? WebI18n.get().Edit || '编辑' : WebI18n.get().Add || '添加'
    return super.getDetail()
  }
}
