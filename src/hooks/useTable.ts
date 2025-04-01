import type { AirEntity, ClassConstructor } from '@airpower/core'
import type { AbstractWebService } from '../service'
import type { IUseTableOption, IUseTableResult } from './interface'
import { ElMessageBox } from 'element-plus'
import { WebI18n } from '../config'
import { useBaseTable } from './useBaseTable.ts'

/**
 * # 引入表格使用的`Hook`
 * @param entityClass 实体类
 * @param serviceClass 表格使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useTable<E extends AirEntity, S extends AbstractWebService<E>>(
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseTableOption<E> = {},
): IUseTableResult<E, S> {
  /**
   * ### 表格`Hook`返回对象
   */
  const result = useBaseTable(entityClass, serviceClass, option)

  /**
   * ### 表格行编辑事件
   * @param row 行数据
   */
  async function onEdit(row: E) {
    if (!option.editView) {
      console.error('请为 useAirTableList 的 option 传入 editor')
      return
    }
    try {
      // todo 弹出窗口
      console.warn('需要弹出并携带数据', row, option.editView)
    }
    finally {
      result.onGetList()
    }
  }

  /**
   * ### 表格行删除事件
   * @param row 行数据
   */
  async function onDelete(row: E) {
    await result.service.delete(row.id, WebI18n.get().DeleteSuccess || '删除成功')
    result.onGetList()
  }

  /**
   * ### 表格行禁用事件
   * @param row 行数据
   */
  async function onDisable(row: E) {
    await ElMessageBox.confirm(
      '是否确认禁用当前选择的数据?',
      '禁用提醒',
      {
        confirmButtonText: '确认禁用',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    await result.service.disable(row.id, WebI18n.get().DisableSuccess || '禁用成功')
    result.onGetList()
  }

  /**
   * ### 表格行启用事件
   * @param row 行数据
   */
  async function onEnable(row: E) {
    await ElMessageBox.confirm(
      '是否确认启用当前选择的数据?',
      '启用提醒',
      {
        confirmButtonText: '确认启用',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    await result.service.enable(row.id, WebI18n.get().EnableSuccess || '启用成功')
    result.onGetList()
  }

  return Object.assign(result, {
    onEdit,
    onDelete,
    onDisable,
    onEnable,
  })
}
