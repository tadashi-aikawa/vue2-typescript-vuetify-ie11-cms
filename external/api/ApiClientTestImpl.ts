import { Either, right } from 'owlelia'
import {
  AddQuestError,
  ApiClient,
  FetchAllQuestsError,
  Quest,
} from '~/external/api/ApiClient'
import { Nullable } from '~/utils/types'
import { asyncSleep } from '~/utils/sleep'

/**
 * テスト用のAPI Client.
 * APIの想定するstateを全て内部で管理して、APIを使っているように見せかける
 */
export class ApiClientTestImpl implements ApiClient {
  quests: Quest[]

  constructor(quests: Quest[] = []) {
    this.quests = quests
  }

  async addQuest(quest: Quest): Promise<Nullable<AddQuestError>> {
    this.quests.push(quest)
    await asyncSleep(1000)
    return Promise.resolve(null)
  }

  async fetchAllQuests(): Promise<Either<FetchAllQuestsError, Quest[]>> {
    await asyncSleep(200)
    return Promise.resolve(right(this.quests))
  }
}
