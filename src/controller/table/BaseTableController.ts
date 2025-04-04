import type { AirEntity, QuerySort } from '@airpower/core'
import type { Ref } from 'vue'
import type { AbstractWebService } from '../../service'
import type { ITableControllerOption } from '../interface'
import { AirClassTransformer, Page, QueryPageRequest, QueryPageResponse } from '@airpower/core'
import { ref } from 'vue'

/**
 * # 表格控制器基类
 *
 * @author Hamm.cn
 */
export class BaseTableController<E extends AirEntity, S extends AbstractWebService<E>, O extends ITableControllerOption<E> = ITableControllerOption<E>> {
  request!: Ref<QueryPageRequest<E>>
  response: Ref<QueryPageResponse<E>> = ref(new QueryPageResponse<E>()) as Ref<QueryPageResponse<E>>
  list = ref<E[]>([]) as Ref<E[]>
  selectList = ref([]) as Ref<E[]>
  isLoading = ref(false)
  protected service!: S
  protected option: O = {} as O

  /**
   * ### 创建表格控制器
   * @param ServiceClass 服务类
   */
  constructor(ServiceClass: new () => S & { entityClass: new () => E }) {
    this.service = AirClassTransformer.newInstance(ServiceClass)
    this.request = ref(new QueryPageRequest<E>(this.service.entityClass)) as Ref<QueryPageRequest<E>>
    this.service.setLoading(this.isLoading)
    this.getList()
  }

  /**
   * ### 设置配置
   * @param option 更多配置
   */
  setOption(option: O): this {
    this.option = option
    if (option.defaultFilter) {
      // 如果提供了默认筛选器 则使用它
      this.request.value.filter = option.defaultFilter
    }
    return this
  }

  /**
   * ### 查询列表事件
   */
  async getList() {
    let req = this.request.value
    if (this.option.beforeSearch) {
      const result = this.option.beforeSearch(req)
      if (result) {
        req = result
      }
    }
    if (this.option.treeList) {
      this.list.value = await this.service.getTreeList(req, this.option.apiUrl)
    }
    else if (!this.option.unPaginate) {
      this.response.value = await this.service.getPage(req, this.option.apiUrl)
      this.list.value = this.response.value.list
    }
    else {
      this.list.value = await this.service.getList(req, this.option.apiUrl)
    }
  }

  /**
   * ### 搜索
   * @param req 请求对象
   */
  async search(req: QueryPageRequest<E>) {
    this.request.value = req
    this.getList()
  }

  /**
   * ### 重新加载数据
   * 会自动返回第一页
   */
  async reload() {
    if (!this.request.value.page) {
      this.request.value.page = new Page()
    }
    this.request.value.page.pageNum = 1
    this.search(this.request.value)
  }

  /**
   * ### 添加事件
   */
  async add() {
    if (!this.option.editView) {
      console.error('请为 useAirTableList 的 option 传入 editView')
      return
    }
    try {
      // todo 弹出编辑
    }
    finally {
      this.getList()
    }
  }

  /**
   * ### 点击表格行详情事件
   * @param row 行数据
   */
  async detail(row: E) {
    if (!this.option.detailView) {
      console.error('请为 useAirTableList 的 option 传入 detailView')
      return
    }
    try {
      // todo 弹出详情
      console.warn('需要弹出并携带数据', row, this.option.detailView)
    }
    finally {
      this.reload()
    }
  }

  /**
   * ### 排序变更事件
   * @param sort 排序对象
   */
  async sortChanged(sort?: QuerySort) {
    this.request.value.sort = sort
    this.request.value.page = new Page()
    this.getList()
  }

  /**
   * ### 选择变更事件
   * @param list 选择列表
   */
  async selectChanged(list: E[]) {
    this.selectList.value = list
  }

  /**
   * ### 分页变更事件
   * @param page 分页对象
   */
  async pageChanged(page: Page) {
    this.request.value.page = page
    this.getList()
  }
}
