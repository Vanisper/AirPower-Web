import type { RootEntity } from '../RootEntity'
import { Type } from '@airpower/transformer'
import { QueryPage } from './QueryPage'
import { QueryRequest } from './QueryRequest'

/**
 * ### 请求分页类
 * @author Hamm.cn
 */
export class QueryRequestPage<E extends RootEntity> extends QueryRequest<E> {
  /**
   * ### 分页信息
   */
  @Type(QueryPage)
  page: QueryPage = new QueryPage()
}
