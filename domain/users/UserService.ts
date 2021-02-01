import { Either } from 'owlelia'
import { UserId } from '~/domain/users/vo/UserId'
import { User } from '~/domain/users/entity/User'
import { AppError } from '~/utils/error'

export class LoginError extends AppError {
  code = 'LOGIN_ERROR'
  name = 'ログインエラー'
}

export interface UserService {
  login(userId: UserId, password: string): Promise<Either<LoginError, User>>
}
