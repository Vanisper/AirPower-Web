import type { RouteMeta } from 'vue-router'
import type { ITree } from './ITree'

/**
 * ### 菜单接口
 *
 * @author Hamm.cn
 */
export interface IMenu extends ITree {
  /**
   * ### 菜单 `URL`
   * 当菜单有 path
   */
  path: string

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

  /**
   * ### 重定向地址
   * @description 如配置了此项，则会自动注册为重定向路由
   * 当匹配该路由时，会自动跳转到 redirect 指定的地址
   */
  redirect?: string

  /**
   * ### 菜单元数据
   */
  meta?: RouteMeta
}
