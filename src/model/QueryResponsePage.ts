import type { Entity } from '../base'
import { Transformer } from '@airpower/transformer'
import { Field } from '../../../../spms/airpower/decorator'
import { QueryPage } from './QueryPage'
import { QuerySort } from './QuerySort'

/**
 * # 响应分页类
 * @author Hamm.cn
 */
export class QueryResponsePage<E extends Entity> extends Transformer {
  /**
   * ### 返回的当前页数据列表
   */
  list: E[] = []

  /**
   * ### 返回的页码信息
   */
  @Field({
    type: QueryPage,
  })
  page = new QueryPage()

  /**
   * ### 返回的排序信息
   */
  @Field({
    type: QuerySort,
  })
  sort = new QuerySort()

  /**
   * ### 返回总条数
   */
  @Field({
    type: Number,
  })
  total = 0

  /**
   * ### 返回总页数
   */
  @Field({
    type: Number,
  })
  pageCount = 0
}
