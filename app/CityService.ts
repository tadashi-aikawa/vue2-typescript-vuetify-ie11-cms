import { Either } from 'owlelia'
import { AppError } from '~/utils/error'
import { City } from '~/domain/quests/entity/City'

export class AllError extends AppError {
  code = 'ALL_ERROR'
  name = 'Cities取得エラー'
}

export interface CityService {
  all(): Promise<Either<AllError, City[]>>
}
