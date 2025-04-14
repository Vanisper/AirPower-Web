import type { Entity, IJson } from '@airpower/core'
import type { Ref } from 'vue'
import type { AbstractWebService } from '../service'
import type { IDetailControllerOption } from './interface'
import { ClassTransformer } from '@airpower/core'
import { ref } from 'vue'
import { WebI18n } from '../i18n'

/**
 * # 详情控制器
 *
 * @author Hamm.cn
 */
export class DetailController<E extends Entity, S extends AbstractWebService<E>, O extends IDetailControllerOption<E> = IDetailControllerOption<E>> {
  isLoading = ref(false)
  formData!: Ref<E>
  title = ref(WebI18n.get().Detail)
  protected service!: S
  protected option: O = {} as O

  /**
   * ### 创建表格控制器
   * @param ServiceClass 服务类
   * @param props `defineProps` 的返回值
   * @param option `可选` 更多的配置
   */
  constructor(
    ServiceClass: new () => S & { entityClass: new () => E },
    props: IJson,
    option: O = {} as O,
  ) {
    this.service = ClassTransformer.newInstance(ServiceClass)
    this.service.setLoading(this.isLoading)
    this.option = option
    this.formData = ref(props.param ? props.param.copy() : ClassTransformer.newInstance(this.service.entityClass))
    this.getDetail()
  }

  /**
   * ### 查询详情方法
   */
  async getDetail(): Promise<void> {
    if (this.formData.value.id) {
      this.formData.value = await this.service.getDetail(this.formData.value.id, this.option.apiUrl)

      if (this.option.afterGetDetail) {
        const result = this.option.afterGetDetail(this.formData.value)
        if (result) {
          this.formData.value = result
        }
      }
    }
  }
}
