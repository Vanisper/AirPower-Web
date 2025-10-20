import type { RootEntity } from '../RootEntity'
import { Type } from '@airpower/transformer'
import { RootModel } from '../RootModel'
import { QueryPage } from './QueryPage'
import { QuerySort } from './QuerySort'

/**
 * ### 响应分页类
 * @author Hamm.cn
 */
export class QueryResponsePage<E extends RootEntity> extends RootModel {
  /**
   * ### 返回的当前页数据列表
   */
  list: E[] = []

  /**
   * ### 返回的页码信息
   */
  @Type(QueryPage)
  page: QueryPage = new QueryPage()

  /**
   * ### 返回的排序信息
   */
  @Type(QuerySort)
  sort: QuerySort = new QuerySort()

  /**
   * ### 返回总条数
   */
  total: number = 0

  /**
   * ### 返回总页数
   */
  pageCount: number = 0
}
