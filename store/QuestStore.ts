import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Quest } from '~/domain/quests/entity/Quest'

@Module({ name: 'QuestStore', namespaced: true, stateFactory: true })
export default class QuestStore extends VuexModule {
  currentQuest: Quest | null = null

  @Mutation
  private setCurrentQuest(quest: Quest) {
    this.currentQuest = quest
  }

  @Action({ rawError: true })
  async updateCurrentQuest(quest: Quest) {
    this.setCurrentQuest(quest)
  }
}
