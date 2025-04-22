import { Field, RootEntity, Search, Table } from '../src'
import { AbstractCurdService } from '../src/curd'

export class User extends RootEntity {
  @Field({
    label: '昵称',
  })
  @Table()
  name!: string

  @Table({
    label: '年龄',
  })
  age!: number

  @Search({
    label: '在哪',
  })
  @Table()
  addr!: string
}

export class UserService extends AbstractCurdService<User> {
  baseUrl = 'user'
  entityClass = User
}
