import type { AirEntity } from '@airpower/core'
import type { AbstractWebService } from '../../service'
import type { ITableControllerOption } from '../interface'
import { ElMessageBox } from 'element-plus'
import { WebI18n } from '../../i18n'
import { BaseTableController } from './BaseTableController'

/**
 * # 表格控制器
 *
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
    await this.confirmPlease(WebI18n.get().ConfirmToDelete)
    await this.service.delete(row.id, WebI18n.get().DeleteSuccess)
    this.getList()
  }

  /**
   * ### 表格行禁用事件
   * @param row 行数据
   */
  async disable(row: E): Promise<void> {
    await this.confirmPlease(WebI18n.get().ConfirmToDisable)
    await this.service.disable(row.id, WebI18n.get().DisableSuccess)
    this.getList()
  }

  /**
   * ### 表格行启用事件
   * @param row 行数据
   */
  async enable(row: E): Promise<void> {
    await this.confirmPlease(WebI18n.get().ConfirmToEnable)
    await this.service.enable(row.id, WebI18n.get().EnableSuccess)
    this.getList()
  }

  /**
   * ### 确认提示
   * @param message 提示信息
   */
  private async confirmPlease(message: string): Promise<void> {
    await ElMessageBox.confirm(
      message,
      WebI18n.get().ConfirmPlease,
      {
        confirmButtonText: WebI18n.get().Confirm,
        cancelButtonText: WebI18n.get().Cancel,
        type: 'warning',
      },
    )
  }
}
