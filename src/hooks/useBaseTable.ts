import type { AirEntity, ClassConstructor, QuerySort } from '@airpower/core'
import type { Ref } from 'vue'
import type { AbstractWebService } from '../service'
import type { ITableHookOption, ITableHookResult } from './interface'
import { AirClassTransformer, Page, QueryPageRequest, QueryPageResponse } from '@airpower/core'
import { ref } from 'vue'

/**
 * # 表格基础`Hook`
 * @param entityClass 实体类
 * @param serviceClass 表格使用的 `Service` 类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useBaseTable<E extends AirEntity, S extends AbstractWebService<E>>(
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: ITableHookOption<E> = {},
): ITableHookResult<E, S> {
  /**
   * ### 加载状态
   */
  const isLoading = ref(false)

  /**
   * ### 请求对象
   */
  const request = ref(new QueryPageRequest<E>(entityClass)) as Ref<QueryPageRequest<E>>

  if (option.defaultFilter) {
    // 如果提供了默认筛选器 则使用它
    request.value.filter = option.defaultFilter
  }

  /**
   * ### 响应对象
   */
  const response = ref(new QueryPageResponse<E>()) as Ref<QueryPageResponse<E>>

  /**
   * ### 表格行数据数组
   */
  const list = ref<E[]>([]) as Ref<E[]>

  /**
   * ### 传入的实体对象
   */
  const entity = AirClassTransformer.newInstance(entityClass)

  /**
   * ### 传入的 `Service` 对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

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
  async function onSearch(req: QueryPageRequest<E>) {
    request.value = req
    onGetList()
  }

  /**
   * ### 重新加载数据事件
   * 会自动返回第一页
   */
  async function onReloadData() {
    if (!request.value.page) {
      request.value.page = new Page()
    }
    request.value.page.pageNum = 1
    onSearch(request.value)
  }

  /**
   * ### 添加事件
   */
  async function onAdd() {
    if (!option.editView) {
      console.error('请为 useAirTableList 的 option 传入 editView')
      return
    }
    try {
      // todo 弹出编辑
      console.warn('需要弹出并携带数据', entity, option.editView)
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
      console.error('请为 useAirTableList 的 option 传入 detailView')
      return
    }
    try {
      // todo 弹出详情
      console.warn('需要弹出并携带数据', row, option.detailView)
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
    request.value.page = new Page()
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
  async function onPageChanged(page: Page) {
    request.value.page = page
    onGetList()
  }

  onGetList()

  return {
    entity,
    service,
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
