import type { IEntity } from '../../base'

/**
 * # 树形结构
 *
 * @author Hamm.cn
 */
export interface ITree<T> extends IEntity {
  /**
   * ### 树的子节点
   * 为了成功的数据转换,请注意自行 `@Type`
   */
  children: Array<T>

  /**
   * ### 父节点 `ID`
   */
  parentId?: number

  /**
   * ### 名称
   */
  name: string
}
