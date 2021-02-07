import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Quest } from '~/domain/quests/entity/Quest'
import { QuestServiceImpl } from '~/app/QuestServiceImpl'
import { ApiClientTestImpl } from '~/external/api/ApiClientTestImpl'
import { Status } from '~/utils/status'
import { AddQuestError, AllError } from '~/app/QuestService'

const questService = new QuestServiceImpl(new ApiClientTestImpl())

@Module({ name: 'QuestStore', namespaced: true, stateFactory: true })
export default class QuestStore extends VuexModule {
  // **********************************
  // 編集中のクエスト
  // **********************************
  currentQuest: Quest | null = null

  @Mutation
  private setCurrentQuest(quest: Quest) {
    this.currentQuest = quest
  }

  @Action({ rawError: true })
  updateCurrentQuest(quest: Quest) {
    this.setCurrentQuest(quest)
  }

  // **********************************
  // クエスト一覧
  // **********************************
  quests: Quest[] | null = null
  fetchingStatus: Status = 'init'
  fetchingError: AllError | null = null

  @Mutation
  private loadingFetching() {
    this.fetchingError = null
    this.fetchingStatus = 'loading'
  }

  @Mutation
  private successFetching(quests: Quest[]) {
    this.fetchingError = null
    this.quests = quests
    this.fetchingStatus = 'success'
  }

  @Mutation
  private failureFetching(error: AllError) {
    this.fetchingError = error
    this.quests = null
    this.fetchingStatus = 'failure'
  }

  @Action({ rawError: true })
  async fetchAllQuests() {
    this.loadingFetching()
    const questsOrErr = await questService.all()
    questsOrErr.biMap(this.failureFetching, this.successFetching)
  }

  // **********************************
  // クエスト追加
  // **********************************
  addingStatus: Status = 'init'
  addingError: AddQuestError | null = null

  @Mutation
  private loadingAdding() {
    this.addingError = null
    this.addingStatus = 'loading'
  }

  @Mutation
  private successAdding() {
    this.addingError = null
    this.addingStatus = 'success'
  }

  @Mutation
  private failureAdding(error: AddQuestError) {
    this.addingError = error
    this.addingStatus = 'failure'
  }

  @Action({ rawError: true })
  async addQuest(quest: Quest) {
    this.loadingAdding()
    const err = await questService.add(quest)
    err ? this.failureAdding(err) : this.successAdding()
  }
}
