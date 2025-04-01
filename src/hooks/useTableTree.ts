import type { ClassConstructor, ITree } from '@airpower/core'
import type { AbstractWebService } from '../service'
import type { IUseTableTreeOption, IUseTableTreeResult } from './interface'
import { AirClassTransformer } from '@airpower/core'
import { useTable } from './useTable'

/**
 * # 引入表格树使用的`Hook`
 * @param entityClass 实体类
 * @param serviceClass 表格使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useTableTree<E extends ITree, S extends AbstractWebService<E>>(
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseTableTreeOption<E> = {},
): IUseTableTreeResult<E, S> {
  // 设置不分页
  if (option.unPaginate === undefined) {
    option.unPaginate = true
  }

  /**
   * ### 表格`Hook`返回对象
   */
  const result = useTable(entityClass, serviceClass, option)

  /**
   * ### 树表格添加子项事件
   * @param row 行数据
   */
  async function onAddRow(row: E) {
    if (!option.editView) {
      console.error('请为 useAirTableList 的 option 传入 editor')
      return
    }
    try {
      let param = AirClassTransformer.newInstance(entityClass)
      param.parentId = row.id
      if (option.beforeAddRow) {
        const result = option.beforeAddRow(param, row)
        if (result !== undefined) {
          param = result
        }
      }
      // todo 弹出编辑
      console.warn('需要弹出并携带数据', param, option.editView)
    }
    finally {
      result.onReloadData()
    }
  }

  return Object.assign(result, {
    onAddRow,
  })
}
