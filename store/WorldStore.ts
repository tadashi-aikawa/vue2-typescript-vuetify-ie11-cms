import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Status } from '~/utils/status'
import { World } from '~/domain/quests/entity/World'
import { FetchAllError } from '~/app/WorldService'
import { FixedWorldService } from '~/app/FixedWorldService'

const worldService = new FixedWorldService()

@Module({ name: 'WorldStore', namespaced: true, stateFactory: true })
export default class WorldStore extends VuexModule {
  worlds: World[] | null = null
  status: Status = 'init'
  error: FetchAllError | null = null

  @Mutation
  private loading() {
    this.error = null
    this.status = 'loading'
  }

  @Mutation
  private success(worlds: World[]) {
    this.error = null
    this.worlds = worlds
    this.status = 'success'
  }

  @Mutation
  private failure(error: FetchAllError) {
    this.error = error
    this.worlds = null
    this.status = 'failure'
  }

  @Action({ rawError: true })
  async fetchWorlds() {
    this.loading()
    const wordsOrErr = await worldService.fetchAll()
    wordsOrErr.biMap(this.failure, this.success)
  }
}
