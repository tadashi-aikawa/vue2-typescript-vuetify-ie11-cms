import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { UserId } from '~/domain/users/vo/UserId'
import { User } from '~/domain/users/entity/User'
import { UserServiceImpl } from '~/app/UserServiceImpl'
import { LoginError } from '~/app/UserService'
import { Status } from '~/utils/status'

const userService = new UserServiceImpl('TODO')

@Module({ name: 'UserStore', namespaced: true, stateFactory: true })
export default class UserStore extends VuexModule {
  currentUser: User | null = null
  loginStatus: Status = 'init'
  loginError: LoginError | null = null

  @Mutation
  private loading() {
    this.loginError = null
    this.loginStatus = 'loading'
  }

  @Mutation
  private success(user: User) {
    this.loginError = null
    this.currentUser = user
    this.loginStatus = 'success'
  }

  @Mutation
  private failure(error: LoginError) {
    this.loginError = error
    this.currentUser = null
    this.loginStatus = 'failure'
  }

  get isLogin(): boolean {
    return !!this.currentUser
  }

  @Action({ rawError: true })
  async login(payload: { userId: UserId; password: string }) {
    this.loading()
    const userOrErr = await userService.login(payload.userId, payload.password)
    userOrErr.biMap(this.failure, this.success)
  }
}
