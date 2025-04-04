import type { AirEntity, ClassConstructor, IJson } from '@airpower/core'
import type { Ref } from 'vue'
import type { IUseDetailOption } from '../hooks'
import type { AbstractWebService } from '../service'
import type { IDetailControllerOption } from './interface'
import { AirClassTransformer } from '@airpower/core'
import { ref } from 'vue'
import { WebI18n } from '../helper'

/**
 * # 详情控制器
 * @param props `defineProps` 的返回值
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的 `Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export class DetailController<E extends AirEntity, S extends AbstractWebService<E>> {
  isLoading = ref(false)
  formData!: Ref<E>
  title = ref(WebI18n.get().Detail || '详情')
  protected service!: S
  protected option: IDetailControllerOption<E> = {}

  static create<T extends DetailController<E, S>, E extends AirEntity, S extends AbstractWebService<E>>(
    this: ClassConstructor<T>,
    props: IJson,
    entityClass: ClassConstructor<E>,
    serviceClass: ClassConstructor<S>,
    option: IUseDetailOption<E> = {},
  ): T {
    const instance = new this()
    instance.service = AirClassTransformer.newInstance(serviceClass)
    instance.option = option
    instance.service.setLoading(instance.isLoading)
    instance.formData = ref(props.param ? props.param.copy() : AirClassTransformer.newInstance(entityClass))
    instance.getDetail()
    return instance
  }

  /**
   * ### 查询详情方法
   */
  async getDetail(): Promise<void> {
    if (this.formData.value.id) {
      this.formData.value = await this.service.getDetail(this.formData.value.id, this.option.apiUrl)

      if (this.option.afterGetDetail) {
        const result = this.option.afterGetDetail(this.formData.value)
        if (result !== undefined) {
          this.formData.value = result
        }
      }
    }
  }
}
