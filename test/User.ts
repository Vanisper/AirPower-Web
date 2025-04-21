import { Entity, Table, WebModel } from '../src'

@WebModel({
  permissionPrefix: 'sssss',
  // addPermission: 'adds',
})
export class User extends Entity {
  @Table()
  name!: string
}
