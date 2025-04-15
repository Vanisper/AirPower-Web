import { Entity } from '@airpower/core'
import { Table } from '../src'

export class User extends Entity {
  @Table()
  name!: string
}
