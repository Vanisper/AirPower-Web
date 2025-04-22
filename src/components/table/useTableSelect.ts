import type { TableInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { RootEntity } from '../../base'
import type { ITree } from '../../model'

export function useTableSelect<E extends RootEntity>(params: {
  tableInstance: Ref<TableInstance | undefined>
  dataList: Array<E>
  selectList: Array<E>
}) {
  const { tableInstance, selectList, dataList } = params

  /**
   * # 选中行
   */
  function selectRow(list: Array<ITree<E>>) {
    for (const row of list) {
      tableInstance.value?.toggleRowSelection(row, false)
      for (const selectedRow of selectList) {
        // 遍历每一行
        if (selectedRow.id === row.id) {
          tableInstance.value?.toggleRowSelection(row, true)
        }
      }
      if (row.children && row.children.length > 0) {
        selectRow(row.children)
      }
    }
  }

  /**
   * # 回显选中
   */
  function toggleSelection() {
    selectRow(dataList as unknown as Array<ITree<E>>)
  }

  return {
    toggleSelection,
  }
}
