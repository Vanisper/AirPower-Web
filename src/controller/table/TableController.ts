import type { AirEntity } from '@airpower/core'
import type { AbstractWebService } from '../../service'
import type { ITableControllerOption } from '../interface'
import { ElMessageBox } from 'element-plus'
import { WebI18n } from '../../helper'
import { BaseTableController } from './BaseTableController'

/**
 * # 表格控制器
 * @author Hamm.cn
 */
export class TableController<
  E extends AirEntity,
  S extends AbstractWebService<E>,
  O extends ITableControllerOption<E> = ITableControllerOption<E>,
> extends BaseTableController<E, S, O> {
  /**
   * ### 表格行编辑事件
   * @param row 行数据
   */
  async edit(row: E): Promise<void> {
    if (!this.option.editView) {
      console.error('请为 useAirTableList 的 option 传入 editor')
      return
    }
    try {
      // todo 弹出窗口
      console.warn('需要弹出并携带数据', row, this.option.editView)
    }
    finally {
      this.getList()
    }
  }

  /**
   * ### 表格行删除事件
   * @param row 行数据
   */
  async delete(row: E): Promise<void> {
    await this.service.delete(row.id, WebI18n.get().DeleteSuccess || '删除成功')
    this.getList()
  }

  /**
   * ### 表格行禁用事件
   * @param row 行数据
   */
  async disable(row: E): Promise<void> {
    await ElMessageBox.confirm(
      '是否确认禁用当前选择的数据?',
      '禁用提醒',
      {
        confirmButtonText: '确认禁用',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    await this.service.disable(row.id, WebI18n.get().DisableSuccess || '禁用成功')
    this.getList()
  }

  /**
   * ### 表格行启用事件
   * @param row 行数据
   */
  async enable(row: E): Promise<void> {
    await ElMessageBox.confirm(
      '是否确认启用当前选择的数据?',
      '启用提醒',
      {
        confirmButtonText: '确认启用',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    await this.service.enable(row.id, WebI18n.get().EnableSuccess || '启用成功')
    this.getList()
  }
}
