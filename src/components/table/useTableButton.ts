import type { ITransformerConstructor } from '@airpower/transformer'
import type { RootEntity } from '../../base'
import { WebConfig } from '../../config'
import { PermissionAction, PermissionUtil } from '../../util'

export function useTableButton<E extends RootEntity>(params: {
  entityClass: ITransformerConstructor<E>
  editPermission?: string
  deletePermission?: string
  addRowPermission?: string
  disablePermission?: string
  enablePermission?: string
  detailPermission?: string
  disableAddRow: (row: E) => boolean
  disableDelete: (row: E) => boolean
  disableEdit: (row: E) => boolean
  disableChangeStatus: (row: E) => boolean
  selectable: (row: E) => boolean
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

  function hasPermission(permission: string) {
    if (WebConfig.disablePermission) {
      return true
    }
    if (!permission) {
      return true
    }
    return PermissionUtil.has(permission)
  }

  function isAddRowDisabled(row: E) {
    if (!hasPermission(addRowPermission)) {
      return true
    }
    return disableAddRow ? disableAddRow(row) : false
  }

  function isDeleteDisabled(row: E) {
    if (!hasPermission(deletePermission)) {
      return true
    }
    return disableDelete ? disableDelete(row) : false
  }

  function isEditDisabled(row: E) {
    if (!hasPermission(editPermission)) {
      return true
    }
    return disableEdit ? disableEdit(row) : false
  }

  function isDetailDisabled(row: E) {
    if (!hasPermission(detailPermission)) {
      return true
    }
    return disableEdit ? disableEdit(row) : false
  }

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
