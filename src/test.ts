import { AirModel, Field } from '../src'

class User extends AirModel {
  @Field({
    // alias: 'name',
    // label: '昵称',
  })
  nick!: string
}

const user = new User()
user.nick = 'Hamm'
console.log(user.toJson())
console.log(User.fromJson({
  nick: 'Hamm',
}))
