import type { ITree } from './ITree'

/**
 * ### 菜单接口
 *
 * @author Hamm.cn
 */
export interface IMenu extends ITree {
  /**
   * ### 菜单 `URL`
   */
  path: string

  /**
   * ### 重定向 `URL`
   * - 没有 component 属性且含有 children 的菜单将会自动启用本配置，默认第一个有效子菜单（有 path 属性即为有效）
   * - 显式指定时，强制重定向
   */
  redirect?: string

  /**
   * ### 元信息
   * 将会增量附加到 RouteMeta 中
   */
  meta?: any

  /**
   * ### 菜单图标
   */
  icon: string

  /**
   * ### 菜单绑定组件路径
   */
  component: string

  /**
   * ### 菜单是否禁用
   */
  isDisabled: boolean
}
