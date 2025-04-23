import type { RootEntity } from '../../../../base'
import type { ITree } from '../../../model'
import type { ITableOption } from '../list'

/**
 * # `TableTreeList` 的 `Hook` 可选配置
 * @author Hamm.cn
 */
export interface ITableTreeOption<T extends ITree & RootEntity> extends ITableOption<T> {
  /**
   * ### 添加行的子项的前置拦截方法
   * 参数为发起请求的数据,请处理后返回 `param`
   *
   * @param param 添加的数据
   * @param row 当前行数据
   */
  beforeAddRow?: (param: T, row: T) => T | void
}
