import type { ITransformerConstructor } from '@airpower/transformer'
import type { RootEntity } from '../base'
import { Transformer, Type } from '@airpower/transformer'
import { QuerySort } from './QuerySort'

/**
 * # 请求类
 * @author Hamm.cn
 */
export class QueryRequest<E extends RootEntity = RootEntity> extends Transformer {
  /**
   * ### 查询信息
   */
  filter!: E

  /**
   * ### 排序信息
   */
  @Type(QuerySort)
  sort?: QuerySort

  /**
   * ### 初始化一个请求类
   * @param filterClass 如传入 `filter` 的类 将自动初始化一个空 `filter`
   */
  constructor(filterClass: ITransformerConstructor<E>) {
    super()
    this.filter = Transformer.parse({}, filterClass)
  }

  /**
   * ### 设置排序对象
   * @param sort 排序对象
   */
  setSort(sort: QuerySort): this {
    this.sort = sort
    return this
  }
}
