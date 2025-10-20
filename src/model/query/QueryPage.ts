import { RootModel } from '../RootModel'

/**
 * ### 分页类
 * @author Hamm.cn
 */
export class QueryPage extends RootModel {
  /**
   * ### 分页页数
   */
  pageNum: number = 1

  /**
   * ### 每页数量
   */
  pageSize: number = 20
}
