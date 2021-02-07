import { Either } from 'owlelia'
import { AppError } from '~/utils/error'
import { Nullable } from '~/utils/types'

export class AddQuestError extends AppError {
  code = 'ADD_QUEST_ERROR'
  name = 'クエスト追加エラー'
}

export class FetchAllQuestsError extends AppError {
  code = 'FETCH_ALL_QUESTS_ERROR'
  name = '全クエスト取得エラー'
}

export interface Quest {
  id: string
  world: {
    name: string
  }
  goal: {
    name: string
  }
  city: {
    begin: {
      name: string
    }
    end: {
      name: string
    }
  }
  date: {
    begin: string
    end: string
  }
  level: {
    name: string
  }
  options: string[]
  description: string
}

export interface ApiClient {
  addQuest(quest: Quest): Promise<Nullable<AddQuestError>>
  fetchAllQuests(): Promise<Either<FetchAllQuestsError, Quest[]>>
}
