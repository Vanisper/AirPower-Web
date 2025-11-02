import { Field } from '../decorator/@Field/Field'
import { Table } from '../decorator/@Table/Table'
import { DisableEnum } from '../enum/DisableEnum'
import { RootModel } from './RootModel'

/**
 * ### 实体模型
 *
 * @author Hamm.cn
 */
export class RootEntity extends RootModel {
  @Field({
    label: 'ID',
  })
  @Table({
    width: 100,
    order: 9999,
    force: true,
    copy: true,
  })
  id!: number

  @Table({
    width: 80,
    order: -100,
    force: true,
    color: true,
  })
  @Field({
    label: '是否禁用',
    dictionary: DisableEnum,
  })
  isDisabled!: boolean

  /**
   * ### 实例化一个实体
   * @param id `可选` 主键 `ID`
   */
  constructor(id?: number) {
    super()
    if (id) {
      this.id = id
    }
  }

  /**
   * ### 设置禁用
   * @param isDisabled 禁用
   */
  setDisable(isDisabled = true): this {
    this.isDisabled = isDisabled
    return this
  }

  /**
   * ### 只暴露ID
   */
  exposeOnlyId(): this {
    return this.expose('id')
  }

  /**
   * ### 只复制ID
   */
  copyOnlyId(): this {
    return this.copy().exposeOnlyId()
  }
}
