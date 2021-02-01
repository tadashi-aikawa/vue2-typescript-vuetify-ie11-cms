import { Either, left, right } from 'owlelia'
import { UserId } from '~/domain/users/vo/UserId'
import { User } from '~/domain/users/entity/User'
import { LoginError, UserService } from '~/domain/users/UserService'
import { asyncSleep } from '~/utils/sleep'

type CogniteClientFaked = any

export class CogniteUserService implements UserService {
  private client: CogniteClientFaked

  constructor(client: CogniteClientFaked) {
    this.client = client
  }

  async login(
    userId: UserId,
    password: string
  ): Promise<Either<LoginError, User>> {
    // FIXME: Implements client.doAnything()
    await asyncSleep(1000)
    return password.length > 4
      ? right(User.of({ id: userId, name: `ユーザー ${userId}` }))
      : left(new LoginError('4文字以下のパスワードはログインできません'))
  }
}
