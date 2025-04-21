import { Table } from '../decorator'
import { Field } from '../decorator/@Field'
import { Model } from './Model'

/**
 * # 实体模型
 *
 * @author Hamm.cn
 */
export class Entity extends Model {
  /**
   * ### 主键 `ID`
   */
  @Field({
    label: 'ID',
  })
  id!: number

  /**
   * ### 是否禁用
   */
  @Table({
    width: 80,
    order: -100,
    force: true,
  })
  @Field({
    label: '是否禁用',
    dictionary: AirDisableDictionary,
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
   * ### 复制一个只包含 `ID` 的实体
   * @returns 仅包含ID的实体
   */
  copyExposeId(): this {
    return this.copy().exposeId()
  }

  /**
   * ### 只暴露 `ID`
   */
  exposeId(): this {
    return this.expose(AirConstant.STRING_ID)
  }

  /**
   * ### 排除 `ID`
   */
  excludeId(): this {
    return this.exclude(AirConstant.STRING_ID)
  }

  /**
   * ### 设置禁用
   * @param isDisabled 禁用
   */
  setDisable(isDisabled = true): this {
    this.isDisabled = isDisabled
    return this
  }
}
