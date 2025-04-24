import type { RootEntity } from '../../model/RootEntity'

/**
 * # `Detail` 的 `Hook` 可选配置
 * @author Hamm.cn
 */
export interface IDetailOption<E extends RootEntity> {
  /**
   * ### 查到详情后的事件
   * 参数为响应的数据,请处理后返回
   *
   * @param detailData 实体
   */
  afterGetDetail?: (detailData: E) => E | void

  /**
   * ### 请求查询详情的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForGetDetail`
   */
  apiUrl?: string
}
