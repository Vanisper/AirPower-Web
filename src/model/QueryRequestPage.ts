import type { Entity } from '../base'
import { Type } from '@airpower/transformer'
import { QueryPage } from './QueryPage'
import { QueryRequest } from './QueryRequest'

/**
 * # 请求分页类
 * @author Hamm.cn
 */
export class QueryRequestPage<E extends Entity> extends QueryRequest<E> {
  /**
   * ### 分页信息
   */
  @Type(QueryPage)
  page = new QueryPage()
}
