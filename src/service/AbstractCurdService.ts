import type { ITransformerConstructor } from '@airpower/transformer'
import type { Entity } from '../base'
import type { QueryRequest } from '../model/QueryRequest'
import type { WebValidateRule } from '../util'
import { Transformer } from '@airpower/transformer'
import { WebI18n } from '../i18n'
import { QueryResponsePage } from '../model/QueryResponsePage'
import { FeedbackUtil } from '../util'
import { AbstractService } from './AbstractService'

/**
 * # 实体 `API` 服务超类
 * 包含了常用的增删改查等方法
 *
 * @param E 泛型实体类
 * @author Hamm.cn
 */
export abstract class AbstractCurdService<E extends Entity> extends AbstractService {
  /**
   * ### 为基类提供当前的实体类
   * 请求时会通过这个类进行数据转换
   */
  abstract entityClass: ITransformerConstructor<E>

  /**
   * ### 分页查询默认 `URL`
   */
  protected urlGetPage = 'getPage'

  /**
   * ### 不分页查询默认 `URL`
   */
  protected urlGetList = 'getList'

  /**
   * ### 不分页树查询默认 `URL`
   */
  protected urlGetTreeList = 'getTreeList'

  /**
   * ### 查询详情默认 `URL`
   */
  protected urlGetDetail = 'getDetail'

  /**
   * ### 添加默认 `URL`
   */
  protected urlAdd = 'add'

  /**
   * ### 启用默认 `URL`
   */
  protected urlEnable = 'enable'

  /**
   * ### 禁用默认 `URL`
   */
  protected urlDisable = 'disable'

  /**
   * ### 修改默认 `URL`
   */
  protected urlUpdate = 'update'

  /**
   * ### 删除默认 `URL`
   */
  protected urlDelete = 'delete'

  /**
   * ### 创建验证器
   * @param form 表单对象
   * @param moreRule `可选` 更多的验证规则
   */
  static createValidator<E extends Entity>(form: E, moreRule: WebValidateRule<E> = {}): WebValidateRule<E> {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return AirValidator.createRules(form, this.newInstance(), moreRule)
  }

  /**
   * ### 查询分页数据列表
   * @param request 请求对象
   * @param apiUrl `可选` 自定义请求URL
   */
  async getPage(request: QueryRequest<E>, apiUrl = this.urlGetPage): Promise<QueryResponsePage<E>> {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const responsePage: QueryResponsePage<E> = await this.api(apiUrl).postArray(request, QueryResponsePage)
    responsePage.list = responsePage.list.map(json => Transformer.parse(json, this.entityClass))
    return responsePage
  }

  /**
   * ### 查询不分页数据列表
   * @param request 请求对象
   * @param apiUrl `可选` 自定义请求URL
   */
  async getList(request: QueryRequest<E>, apiUrl = this.urlGetList): Promise<E[]> {
    return this.api(apiUrl).postArray(request, this.entityClass)
  }

  /**
   * ### 查询树结构数据数组
   * @param request 请求对象
   * @param apiUrl `可选` 自定义请求URL
   */
  async getTreeList(request: QueryRequest<E>, apiUrl = this.urlGetTreeList): Promise<E[]> {
    return this.api(apiUrl).postArray(request, this.entityClass)
  }

  /**
   * ### 根据 `ID` 获取详情对象
   * @param id ID
   * @param apiUrl `可选` 自定义请求URL
   */
  async getDetail(id: number, apiUrl = this.urlGetDetail): Promise<E> {
    return this.api(apiUrl).post(this.newEntityInstance(id), this.entityClass)
  }

  /**
   * ### 添加一条新的数据
   * @param data 保存的数据
   * @param message `可选` 添加成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async add(data: E, message?: string, apiUrl = this.urlAdd): Promise<number> {
    const saved = await this.api(apiUrl).post(data, this.entityClass)
    FeedbackUtil.toastSuccess(message || WebI18n.get().AddSuccess)
    return saved.id
  }

  /**
   * ### 修改一条数据
   * @param data 修改的数据实体
   * @param message `可选` 修改成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async update(data: E, message?: string, apiUrl = this.urlUpdate): Promise<void> {
    await this.api(apiUrl).request(data)
    FeedbackUtil.toastSuccess(message || WebI18n.get().UpdateSuccess)
  }

  /**
   * ### 保存一条数据并返回主键 `ID`
   *
   * 如包含 `ID` 则更新 如不包含 则创建
   * @param data 保存的数据实体
   * @param message `可选` 保存成功的消息提示内容
   */
  async save(data: E, message?: string): Promise<number> {
    if (data.id) {
      await this.update(data, message)
      return data.id
    }
    return this.add(data, message)
  }

  /**
   * ### 根据 `ID` 删除一条数据
   * @param id 删除的数据 `ID`
   * @param message `可选` 删除成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async delete(id: number, message?: string, apiUrl = this.urlDelete): Promise<void> {
    const instance = this.newEntityInstance(id)
    try {
      await this.api(apiUrl).throwError().request(instance)
      FeedbackUtil.toastSuccess(message || WebI18n.get().DeleteSuccess)
    }
    catch (err) {
      FeedbackUtil.toastError((err as Error).message)
    }
  }

  /**
   * ### 根据 `ID` 禁用一条数据
   * @param id 禁用的数据 `ID`
   * @param message `可选` 禁用成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async disable(id: number, message?: string, apiUrl = this.urlDisable): Promise<void> {
    const instance = this.newEntityInstance(id)
    try {
      await this.api(apiUrl).throwError().request(instance)
      FeedbackUtil.toastSuccess(message || WebI18n.get().DisableSuccess)
    }
    catch (err) {
      FeedbackUtil.toastError((err as Error).message)
    }
  }

  /**
   * ### 根据 `ID` 启用一条数据
   * @param id 启用的数据 `ID`
   * @param message `可选` 启用成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async enable(id: number, message?: string, apiUrl = this.urlEnable): Promise<void> {
    try {
      await this.api(apiUrl).throwError().request(this.newEntityInstance(id))
      FeedbackUtil.toastSuccess(message || WebI18n.get().EnableSuccess)
    }
    catch (err) {
      FeedbackUtil.toastError((err as Error).message)
    }
  }

  /**
   * ### `内部使用`
   * @deprecated
   */
  createValidator<E extends Entity>(form: E, moreRule: WebValidateRule<E> = {}): WebValidateRule<E> {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return AirValidator.createRules(form, this, moreRule)
  }

  /**
   * ### 创建一个实体的实例
   * @param id `可选` `ID`
   */
  protected newEntityInstance(id?: number): E {
    // eslint-disable-next-line new-cap
    const entity = new this.entityClass()
    if (id) {
      entity.id = id
    }
    return entity
  }
}
