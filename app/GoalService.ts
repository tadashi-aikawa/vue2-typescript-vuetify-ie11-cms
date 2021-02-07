import { Either } from 'owlelia'
import { AppError } from '~/utils/error'
import { Goal } from '~/domain/quests/entity/Goal'

export class AllError extends AppError {
  code = 'ALL_ERROR'
  name = 'Goals取得エラー'
}

export interface GoalService {
  all(): Promise<Either<AllError, Goal[]>>
}
