import { Transformer } from '@airpower/transformer'

/**
 * ### 分页类
 * @author Hamm.cn
 */
export class QueryPage extends Transformer {
  /**
   * ### 分页页数
   */
  pageNum = 1

  /**
   * ### 每页数量
   */
  pageSize = 20
}
