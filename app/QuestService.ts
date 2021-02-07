import { Either } from 'owlelia'
import { AppError } from '~/utils/error'
import { Quest } from '~/domain/quests/entity/Quest'
import { Nullable } from '~/utils/types'

export class AddQuestError extends AppError {
  code = 'ADD_QUEST_ERROR'
  name = 'Quest追加エラー'
}

export class AllError extends AppError {
  code = 'ALL_ERROR'
  name = '全Quest取得エラー'
}

export interface QuestService {
  add(quest: Quest): Promise<Nullable<AddQuestError>>
  all(): Promise<Either<AllError, Quest[]>>
}
