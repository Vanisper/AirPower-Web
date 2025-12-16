import type { Router, RouteRecordRaw, RouteRecordRedirect } from 'vue-router'
import type { IMenu } from '../interface/IMenu'
import type { RootEntity } from '../model/RootEntity'
import { createRouter, createWebHistory } from 'vue-router'
import { WebConfig } from '../config/WebConfig'

/**
 * ### `Vue` 路由助手
 * @author Hamm.cn
 */
export class RouterUtil {
  /**
   * ### 当前路由
   */
  static router: Router

  /**
   * ### 私有构造器
   */
  private static components: Record<string, () => Promise<unknown>> = {}

  /**
   * ### 组件目录
   */
  private static componentsDirectory = ''

  /**
   * ### 将 `IMenu` 菜单列表初始化到 `Vue` 路由中
   * @param menuList 菜单列表
   * @param components 组件列表
   * @param componentsDirectory `可选` 组件目录 默认 `/src/view`
   * @param parentRouter `可选` 父级路由 默认 `admin`
   * @param menuCacheKey `可选` 缓存Key 默认 `AirPowerMenuList`
   */
  static initVueRouter(menuList: Array<IMenu & RootEntity>, components: Record<string, () => Promise<unknown>> = {}, componentsDirectory = '/src/view', parentRouter = 'admin', menuCacheKey = 'AirPowerMenuList'): void {
    this.components = components
    this.componentsDirectory = componentsDirectory
    localStorage.setItem(menuCacheKey, JSON.stringify(menuList))
    if (!WebConfig.isTimeout) {
      this.registerRoute(menuList, parentRouter)
      this.reloadCacheMenuList(menuCacheKey)
    }
  }

  /**
   * ### 创建 `Vue` 路由实例
   * @param routes 路由配置文件
   * @param ignoreGuard 不使用守卫
   */
  static createRouter(routes: RouteRecordRaw[], ignoreGuard = false): Router {
    // 创建路由
    const router: Router = createRouter({
      history: createWebHistory(),
      routes,
    })
    router.afterEach(() => {
      window.scrollTo(0, 0)
    })
    if (!ignoreGuard) {
      router.beforeEach((to, _, next) => {
        if (to.meta.name || to.name) {
          window.document.title = `${to.meta.name || to.name} - ${WebConfig.product}` || WebConfig.product
        }
        next()
      })
    }
    this.router = router
    return router
  }

  /**
   * ### 注册 `Vue` 路由
   * @param menuList 菜单列表
   * @param parentRouter 父级路由名称
   */
  private static registerRoute(menuList: Array<IMenu & RootEntity>, parentRouter: string): void {
    menuList.forEach((item): void => {
      if (!this.router) {
        throw new Error('请先调用 createRouter 创建路由')
      }
      if (!item.name) {
        throw new Error('路由初始化失败，缺少参数')
      }
      if (this.router.hasRoute(item.id.toString())) {
        return
      }
      if (item.children && item.children.length > 0) {
        // 处理所有子路由
        this.registerRoute(item.children, parentRouter)
      }

      if (!item.path) {
        // 是菜单的集合，不存在真实路由
        return
      }

      if (item.redirect) {
        // 重定向路由
        this.addRoute(parentRouter, item)
        return
      }
      const componentPath: string = item.component || item.path
      if (componentPath) {
        // 普通物理路由
        this.addRoute(parentRouter, item, componentPath)
      }
    })
  }

  /**
   * ### 添加路由
   * @param parentRouter 父级路由名称
   * @param menu 菜单
   * @param componentPath 组件路径
   */
  private static addRoute(parentRouter: string, menu: IMenu & RootEntity, componentPath?: string): void {
    const routeRawData = {
      path: menu.path,
      name: menu.id.toString(),
      meta: {
        ...menu.meta,
        ...{ name: menu.name },
      },
    }
    if (componentPath) {
      const route: RouteRecordRaw = {
        ...routeRawData,
        ...{ component: this.components[`${this.componentsDirectory}${componentPath}.vue`] },
      }
      this.router.addRoute(parentRouter, route)
      return
    }
    if (menu.redirect) {
      const route: RouteRecordRedirect = {
        ...routeRawData,
        ...{ redirect: menu.redirect },
      }
      this.router.addRoute(parentRouter, route)
    }
    throw new Error('路由添加失败，不太能走到这里')
  }

  /**
   * ### 重载缓存中的路由
   * @param menuCacheKey 提供缓存的Key
   * @param menuList `可选 子菜单,好兄弟,你不用传`
   */
  private static reloadCacheMenuList(menuCacheKey: string, menuList?: Array<IMenu & RootEntity>): void {
    if (!this.router) {
      return
    }
    if (!menuList && localStorage.getItem(menuCacheKey)) {
      menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]')
    }
    if (menuList === undefined) {
      return
    }
    for (const item of menuList) {
      if (item.children && item.children.length > 0) {
        this.reloadCacheMenuList(menuCacheKey, item.children)
        continue
      }
      const locationPathName: string = window.location.pathname
      if (item.path === locationPathName) {
        localStorage.removeItem(menuCacheKey)
        this.router.replace(locationPathName + window.location.search)
        break
      }
    }
  }
}
