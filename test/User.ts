import { RootEntity, Table, WebModel } from '../src'

@WebModel({
  permissionPrefix: 'sssss',
  // addPermission: 'adds',
})
export class User extends RootEntity {
  @Table()
  name!: string
}
