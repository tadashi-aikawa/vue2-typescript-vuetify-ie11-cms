import { aggregate, Either, left, right } from 'owlelia'
import { AddQuestError, AllError, QuestService } from '~/app/QuestService'
import { Quest } from '~/domain/quests/entity/Quest'
import * as Client from '~/external/api/ApiClient'
import { Nullable } from '~/utils/types'
import { apiToDomain, domainToApi } from '~/mapper/QuestMapper'

export class QuestServiceImpl implements QuestService {
  private client: Client.ApiClient

  constructor(client: Client.ApiClient) {
    this.client = client
  }

  add(quest: Quest): Promise<Nullable<AddQuestError>> {
    return this.client.addQuest(domainToApi(quest))
  }

  async all(): Promise<Either<AllError, Quest[]>> {
    const resOrErr = await this.client.fetchAllQuests()
    if (resOrErr.isLeft()) {
      return left(new AllError(resOrErr.error.message))
    }

    const questOrErrs = aggregate(resOrErr.value.map(apiToDomain))
    if (questOrErrs.isLeft()) {
      return left(
        new AllError(questOrErrs.error.map((x) => x.message).join('\n'))
      )
    }

    return right(questOrErrs.value)
  }
}
