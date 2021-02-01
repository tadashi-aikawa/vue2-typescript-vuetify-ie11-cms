import { Entity } from 'owlelia'
import { UserId } from '~/domain/users/vo/UserId'

interface Props {
  id: UserId
  name: string
}

declare const _brand: unique symbol
export class User extends Entity<Props> {
  private [_brand]: void

  static of(props: Props): User {
    return new User(props.id, props)
  }
}
