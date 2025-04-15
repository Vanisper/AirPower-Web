import type { ClassConstructor, Entity } from '@airpower/core'
import { WebConfig } from '../../config'
import { getWebModelConfig } from '../../decorator'
import { WebPermissionAction } from './WebPermissionAction'

/**
 * # 权限标识处理类
 * @author Hamm.cn
 */
export class WebPermissionUtil {
  /**
   * ### 权限列表
   */
  private static permissionList: string[] = []

  /**
   * ### 权限缓存 `Key`
   */
  private static readonly permissionKey = '_permissions'

  /**
   * ### 获取指定实体类在某个场景的权限标识字符串
   * @param EntityClass 实体类
   * @param action 权限场景
   */
  static get(EntityClass: ClassConstructor<Entity> | null | undefined, action: WebPermissionAction): string {
    if (!EntityClass) {
      return ''
    }
    const modelConfig = getWebModelConfig(new EntityClass())
    if (!modelConfig) {
      return ''
    }
    if (WebConfig.autoPermission) {
      // 自动处理权限
      if (!modelConfig.permissionPrefix) {
        // 没有配置前缀 从类中获取权限前缀
        const entityName = EntityClass.name.replace('Entity', '').toString()
        modelConfig.permissionPrefix = entityName.slice(0, 1) + entityName.slice(1)
      }
    }
    else {
      // 如不自动配置权限, 则将权限前缀清空
      modelConfig.permissionPrefix = ''
    }
    const permissionPrefix = `${modelConfig.permissionPrefix}_`

    switch (action) {
      case WebPermissionAction.ADD:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.addPermission, action)
      case WebPermissionAction.DELETE:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.deletePermission, action)
      case WebPermissionAction.EDIT:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.editPermission, action)
      case WebPermissionAction.DETAIL:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.detailPermission, action)
      case WebPermissionAction.ADD_CHILD:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.addChildPermission, action)
      case WebPermissionAction.EXPORT:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.exportPermission, action)
      case WebPermissionAction.IMPORT:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.importPermission, action)
      default:
    }
    return ''
  }

  /**
   * ### 保存权限列表
   * @param permissions 权限列表
   */
  static saveList(permissions: string[]) {
    this.permissionList = permissions.map(permission => permission.toLocaleLowerCase())
    localStorage.setItem(WebConfig.appKey + this.permissionKey, JSON.stringify(this.permissionList))
  }

  /**
   * ### 获取缓存的权限列表
   */
  static getList(): string[] {
    const str = localStorage.getItem(WebConfig.appKey + this.permissionKey) || '[]'
    try {
      return JSON.parse(str)
    }
    catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * ### 是否有权限
   * @param permission 权限标识
   */
  static has(permission: string): boolean {
    return this.permissionList.includes(permission.toLowerCase())
  }

  /**
   * ### 根据配置获取权限后缀
   *
   * - `WebConfig.autoPermission=false` 只取 `EntityConfig` 配置的权限, 取不到则认为不校验权限
   * - `WebConfig.autoPermission=true`  取 `EntityConfig` 配置的权限, 取不到则按 `action` 自动取
   */
  private static getAutoPermissionFlag(permission: string | undefined, action: WebPermissionAction) {
    if (WebConfig.autoPermission) {
      return permission || action
    }
    return permission || ''
  }
}
