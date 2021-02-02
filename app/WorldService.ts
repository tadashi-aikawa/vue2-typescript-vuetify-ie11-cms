import { Either } from 'owlelia'
import { AppError } from '~/utils/error'
import { World } from '~/domain/quests/entity/World'

export class FetchAllError extends AppError {
  code = 'FETCH_ALL_ERROR'
  name = 'World取得エラー'
}

export interface WorldService {
  fetchAll(): Promise<Either<FetchAllError, World[]>>
}
