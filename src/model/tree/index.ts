/**
 * # 树形结构
 *
 * @author Hamm.cn
 */
export interface ITree<T extends ITree<T>> {
  /**
   * ### 树的子节点
   * 为了成功的数据转换,请注意自行 `@Type`
   */
  children: this[]

  /**
   * ### 父节点 `ID`
   */
  parentId?: number
}
