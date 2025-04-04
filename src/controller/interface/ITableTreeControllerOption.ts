import type { AirEntity, ITree } from '@airpower/core'
import type { ITableControllerOption } from './ITableControllerOption'

/**
 * # 表格树控制器配置项
 * @author Hamm.cn
 */
export interface ITableTreeControllerOption<T extends ITree & AirEntity> extends ITableControllerOption<T> {
  /**
   * ### 添加行的子项的前置拦截方法
   * 参数为发起请求的数据,请处理后返回 `param`
   *
   * @param param 添加的数据
   * @param row 当前行数据
   */
  beforeAddRow?: (param: T, row: T) => T | void
}
