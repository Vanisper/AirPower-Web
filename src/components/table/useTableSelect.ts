import type { TableInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { ITree } from '../../interface/ITree'
import type { RootEntity } from '../../model/RootEntity'

/**
 * ### 表格多选
 *
 * @author Hamm.cn
 */
export function useTableSelect<E extends RootEntity>(params: {
  /**
   * ### 表格实例
   */
  tableInstance: Ref<TableInstance | undefined>

  /**
   * ### 数据列表
   */
  dataList: Array<E>

  /**
   * ### 选中列表
   */
  selectList: Array<E>
}) {
  const { tableInstance, selectList, dataList } = params

  /**
   * ### 选中行
   */
  function selectRow(list: Array<ITree & E>) {
    for (const row of list) {
      tableInstance.value?.toggleRowSelection(row, false)
      for (const selectedRow of selectList) {
        // 遍历每一行
        if (selectedRow.id === row.id) {
          tableInstance.value?.toggleRowSelection(row, true)
        }
      }
      if (row.children && row.children.length > 0) {
        selectRow(row.children as unknown as Array<ITree & E>)
      }
    }
  }

  /**
   * ### 回显选中
   */
  function toggleSelection() {
    selectRow(dataList as unknown as Array<ITree & E>)
  }

  return {
    toggleSelection,
  }
}
