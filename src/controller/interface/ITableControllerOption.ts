import type { AirEntity, QueryPageRequest } from '@airpower/core'
import type { Component } from 'vue'

/**
 * # 表格控制器配置项
 *
 * @author Hamm.cn
 */
export interface ITableControllerOption<E extends AirEntity> {
  /**
   * ### 不分页
   * 默认请求分页接口 如配置了 `treeList` 则此项自动失效
   */
  unPaginate?: boolean

  /**
   * ### 请求专用的 `treeList` 接口
   */
  treeList?: boolean

  /**
   * ### 默认的筛选器
   */
  defaultFilter?: E

  /**
   * ### 详情的视图 `Vue` 文件
   */
  detailView?: Component

  /**
   * ### 新增和编辑视图的 `Vue` 文件
   */
  editView?: Component

  /**
   * ### 请求的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForGetXXX`
   */
  apiUrl?: string

  /**
   * ### 搜索前的拦截方法
   * 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */
  beforeSearch?: (requestData: QueryPageRequest<E>) => QueryPageRequest<E> | void
}
