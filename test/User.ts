import { AbstractCurdService, Field, RootEntity, Search, Table } from '../src'

export class User extends RootEntity {
  @Field({
    label: '昵称',
  })
  @Table()
  name!: string

  @Table({})
  age!: number

  @Search({})
  @Table()
  addr!: string
}

export class UserService extends AbstractCurdService<User> {
  baseUrl = 'user'
  entityClass = User
}
