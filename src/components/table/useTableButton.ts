import type { ITransformerConstructor } from '@airpower/transformer'
import type { RootEntity } from '../../model/RootEntity'
import { WebConfig } from '../../config/WebConfig'
import { PermissionAction } from '../../permission/PermissionAction'
import { PermissionUtil } from '../../permission/PermissionUtil'

/**
 * # 表格按钮权限控制
 *
 * @author Hamm.cn
 */
export function useTableButton<E extends RootEntity>(params: {
  /**
   * ### 实体类
   */
  entityClass: ITransformerConstructor<E>

  /**
   * ### 编辑权限标识
   */
  editPermission?: string

  /**
   * ### 删除权限标识
   */
  deletePermission?: string

  /**
   * ### 添加子项权限标识
   */
  addRowPermission?: string

  /**
   * ### 禁用权限标识
   */
  disablePermission?: string

  /**
   * ### 启用权限标识
   */
  enablePermission?: string

  /**
   * ### 详情权限标识
   */
  detailPermission?: string

  /**
   * ### 禁用添加子项函数
   * @param row 行数据
   */
  disableAddRow: (row: E) => boolean

  /**
   * ### 禁用删除函数
   * @param row 行数据
   */
  disableDelete: (row: E) => boolean

  /**
   * ### 禁用编辑函数
   * @param row 行数据
   */
  disableEdit: (row: E) => boolean

  /**
   * ### 禁用状态切换函数
   * @param row 行数据
   */
  disableChangeStatus: (row: E) => boolean

  /**
   * ### 是否可选
   * @param row 行数据
   */
  selectable: (row: E) => boolean

  /**
   * ### 添加按钮是否禁用
   * @param row 行数据
   */
  isAddDisabled: (row: E) => boolean
}) {
  const {
    entityClass,
    editPermission = PermissionUtil.get(entityClass, PermissionAction.EDIT),
    deletePermission = PermissionUtil.get(entityClass, PermissionAction.DELETE),
    addRowPermission = PermissionUtil.get(entityClass, PermissionAction.ADD_CHILD),
    disablePermission = PermissionUtil.get(entityClass, PermissionAction.DISABLE),
    enablePermission = PermissionUtil.get(entityClass, PermissionAction.ENABLE),
    detailPermission = PermissionUtil.get(entityClass, PermissionAction.DETAIL),
    disableAddRow,
    disableDelete,
    disableEdit,
    disableChangeStatus,
    selectable,
  } = params

  /**
   * ### 判断是否有权限
   * @param permission 权限标识
   */
  function hasPermission(permission: string) {
    if (WebConfig.disablePermission) {
      return true
    }
    if (!permission) {
      return true
    }
    return PermissionUtil.has(permission)
  }

  /**
   * ### 添加子项是否禁用
   * @param row 行数据
   */
  function isAddRowDisabled(row: E) {
    if (!hasPermission(addRowPermission)) {
      return true
    }
    return disableAddRow ? disableAddRow(row) : false
  }

  /**
   * ### 删除是否禁用
   * @param row 行数据
   */
  function isDeleteDisabled(row: E) {
    if (!hasPermission(deletePermission)) {
      return true
    }
    return disableDelete ? disableDelete(row) : false
  }

  /**
   * ### 编辑是否禁用
   * @param row 行数据
   */
  function isEditDisabled(row: E) {
    if (!hasPermission(editPermission)) {
      return true
    }
    return disableEdit ? disableEdit(row) : false
  }

  /**
   * ### 详情是否禁用
   * @param row 行数据
   */
  function isDetailDisabled(row: E) {
    if (!hasPermission(detailPermission)) {
      return true
    }
    return disableEdit ? disableEdit(row) : false
  }

  /**
   * ### 禁用/启用是否禁用
   * @param row 行数据
   */
  function isDisableChangeStatus(row: E) {
    let permission
    if (row.isDisabled) {
      // 被禁用，判断是否有启用权限
      permission = enablePermission
    }
    else {
      // 被启用，判断是否有禁用权限
      permission = disablePermission
    }
    if (!hasPermission(permission)) {
      return true
    }
    return disableChangeStatus ? disableChangeStatus(row) : false
  }

  /**
   * ### 是否可选
   * @param row 行数据
   */
  const isSelectable = (row: E) => (selectable ? selectable(row) : true)

  return {
    isSelectable,
    isAddRowDisabled,
    isDeleteDisabled,
    isEditDisabled,
    isDetailDisabled,
    isDisableChangeStatus,
  }
}
