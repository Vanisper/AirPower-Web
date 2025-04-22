import { RootEntity, Table } from '../src'

export class User extends RootEntity {
  @Table()
  name!: string
}
