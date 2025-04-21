import type { RootEntity } from '../../../base'
import type { AbstractCurdService, CurdServiceConstructor } from '../../../curd'
import type { ITableOption } from './ITableOption'
import type { ITableResult } from './ITableResult'
import { DialogUtil } from '../../../components'
import { WebI18n } from '../../../i18n'
import { FeedbackUtil } from '../../../util'
import { useBaseTable } from '../base'

/**
 * # 引入表格使用的`Hook`
 * @param serviceClass 表格使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useTable<E extends RootEntity, S extends AbstractCurdService<E>>(
  serviceClass: CurdServiceConstructor<E, S>,
  option: ITableOption<E> = {},
): ITableResult<E, S> {
  /**
   * ### 表格`Hook`返回对象
   */
  const result = useBaseTable(serviceClass, option)

  /**
   * ### 表格行编辑事件
   * @param row 行数据
   */
  async function onEdit(row: E) {
    if (!option.editView) {
      await FeedbackUtil.alertError('请为 useAirTableList 的 option 传入 editor')
      return
    }
    try {
      await DialogUtil.show(option.editView, row)
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
    await result.service.delete(row.id, WebI18n.get().DeleteSuccess)
    result.onGetList()
  }

  /**
   * ### 表格行禁用事件
   * @param row 行数据
   */
  async function onDisable(row: E) {
    await FeedbackUtil.confirmWarning(WebI18n.get().ConfirmToDisable, WebI18n.get().ConfirmPlease)
    await result.service.disable(row.id, WebI18n.get().DisableSuccess)
    result.onGetList()
  }

  /**
   * ### 表格行启用事件
   * @param row 行数据
   */
  async function onEnable(row: E) {
    await FeedbackUtil.confirmWarning(WebI18n.get().ConfirmToEnable, WebI18n.get().ConfirmPlease)
    await result.service.enable(row.id, WebI18n.get().EnableSuccess)
    result.onGetList()
  }

  return Object.assign(result, {
    onEdit,
    onDelete,
    onDisable,
    onEnable,
  })
}
