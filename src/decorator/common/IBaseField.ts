import type { RootModel } from '../../base'

export type IsModelInstance<T> = T extends RootModel ? true : false

/**
 * ### 字段基础配置
 *
 * @author Hamm.cn
 */
export interface IBaseField<M extends RootModel = any> {
  /**
   * ### 字段标题
   * 此字段无需传入, 将自动从被标记类的属性上读取
   */
  key?: IsModelInstance<M> extends true ? keyof M : string

  /**
   * ### 字段标题
   * 优先级：(`Table.label` = `Search.label` = `Form.label`) > `Field.label` > `Key`
   */
  label?: string
}
