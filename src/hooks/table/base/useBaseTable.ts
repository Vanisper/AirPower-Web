import type { Ref } from 'vue'
import type { QuerySort } from '../../../model/query/QuerySort'
import type { RootEntity } from '../../../model/RootEntity'
import type { AbstractCurdService } from '../../../service/AbstractCurdService'
import type { CurdServiceConstructor } from '../../../service/type'
import type { IBaseTableOption } from './IBaseTableOption'
import type { IBaseTableResult } from './IBaseTableResult'
import { ref } from 'vue'
import { DialogUtil } from '../../../dialog/DialogUtil'
import { FeedbackUtil } from '../../../feedback/FeedbackUtil'
import { QueryPage } from '../../../model/query/QueryPage'
import { QueryRequestPage } from '../../../model/query/QueryRequestPage'
import { QueryResponsePage } from '../../../model/query/QueryResponsePage'
import { RootModel } from '../../../model/RootModel'

/**
 * ### 表格基础`Hook`
 * @param serviceClass 表格使用的 `Service` 类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useBaseTable<E extends RootEntity, S extends AbstractCurdService<E>>(
  serviceClass: CurdServiceConstructor<E, S>,
  option: IBaseTableOption<E> = {},
): IBaseTableResult<E, S> {
  /**
   * ### 加载状态
   */
  const isLoading = ref(false)

  /**
   * ### 传入的 `Service` 对象
   */
  const service = RootModel.newInstance(serviceClass)
  service.loading = isLoading

  /**
   * ### 请求对象
   */
  const request = ref(new QueryRequestPage<E>(service.entityClass)) as Ref<QueryRequestPage<E>>

  if (option.defaultFilter) {
    // 如果提供了默认筛选器 则使用它
    request.value.filter = option.defaultFilter
  }

  /**
   * ### 响应对象
   */
  const response = ref(new QueryResponsePage<E>()) as Ref<QueryResponsePage<E>>

  /**
   * ### 表格行数据数组
   */
  const list = ref<E[]>([]) as Ref<E[]>

  /**
   * ### 传入的实体对象
   */
  const entity = RootModel.newInstance(service.entityClass)

  /**
   * ### 选择的列表
   */
  const selectList = ref([]) as Ref<E[]>

  /**
   * ### 查询列表事件
   */
  async function onGetList() {
    let req = request.value
    if (option.beforeSearch) {
      const result = option.beforeSearch(req)
      if (result !== undefined) {
        req = result
      }
    }
    if (option.treeList) {
      list.value = await service.getTreeList(req, option.apiUrl)
    }
    else if (!option.unPaginate) {
      response.value = await service.getPage(req, option.apiUrl)
      list.value = response.value.list
    }
    else {
      list.value = await service.getList(req, option.apiUrl)
    }
  }

  /**
   * ### 搜索事件
   * @param req 请求对象
   */
  async function onSearch(req: QueryRequestPage<E>) {
    request.value = req
    onGetList()
  }

  /**
   * ### 重新加载数据事件
   * 会自动返回第一页
   */
  async function onReloadData() {
    if (!request.value.page) {
      request.value.page = new QueryPage()
    }
    request.value.page.pageNum = 1
    onSearch(request.value)
  }

  /**
   * ### 添加事件
   */
  async function onAdd() {
    if (!option.editView) {
      FeedbackUtil.toastError('请为 useTable 的 option 传入 editView')
      return
    }
    try {
      await DialogUtil.show(option.editView)
    }
    finally {
      onGetList()
    }
  }

  /**
   * ### 点击表格行详情事件
   * @param row 行数据
   */
  async function onDetail(row: E) {
    if (!option.detailView) {
      FeedbackUtil.toastError('请为 useTable 的 option 传入 detailView')
      return
    }
    try {
      await DialogUtil.show(option.detailView, row)
    }
    finally {
      onReloadData()
    }
  }

  /**
   * ### 排序变更事件
   * @param sort 排序对象
   */
  async function onSortChanged(sort?: QuerySort) {
    request.value.sort = sort
    request.value.page = new QueryPage()
    onGetList()
  }

  /**
   * ### 选择变更事件
   * @param list 选择列表
   */
  async function onSelected(list: E[]) {
    selectList.value = list
  }

  /**
   * ### 分页变更事件
   * @param page 分页对象
   */
  async function onPageChanged(page: QueryPage) {
    request.value.page = page
    onGetList()
  }

  return {
    entity,
    service,
    serviceClass,
    isLoading,
    response,
    request,
    list,
    selectList,
    onSearch,
    onPageChanged,
    onAdd,
    onSortChanged,
    onSelected,
    onGetList,
    onDetail,
    onReloadData,
  }
}
