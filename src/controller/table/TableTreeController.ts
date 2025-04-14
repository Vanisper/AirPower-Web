import type { Entity, ITree } from '@airpower/core'
import type { AbstractWebService } from '../../service'
import type { ITableTreeControllerOption } from '../interface'
import { ClassTransformer } from '@airpower/core'
import { TableController } from './TableController'

/**
 * # 表格控制器
 *
 * @author Hamm.cn
 */
export class TableTreeController<E extends ITree & Entity, S extends AbstractWebService<E>> extends TableController<E, S, ITableTreeControllerOption<E>> {
  /**
   * ### 树表格添加子项事件
   * @param row 行数据
   */
  async onAddRow(row: E) {
    if (!this.option.editView) {
      console.error('请为 useAirTableList 的 option 传入 editor')
      return
    }
    try {
      let param = ClassTransformer.newInstance(this.service.entityClass)
      param.parentId = row.id
      if (this.option.beforeAddRow) {
        const result = this.option.beforeAddRow(param, row)
        if (result !== undefined) {
          param = result
        }
      }
      // todo 弹出编辑
      console.warn('需要弹出并携带数据', param, this.option.editView)
    }
    finally {
      this.reload()
    }
  }
}
