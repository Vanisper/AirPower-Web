import { AirEntity } from '@airpower/core'
import { TableController } from './controller/table'
import { AbstractWebService } from './service'

class UserEntity extends AirEntity {
  nickname!: string
}

class UserService extends AbstractWebService<UserEntity> {
  baseUrl = 'user'
  entityClass = UserEntity
}

const controller = new TableController(UserService)
controller.request()
