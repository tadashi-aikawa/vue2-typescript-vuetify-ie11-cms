import { Either, right } from 'owlelia'
import { asyncSleep } from '~/utils/sleep'
import { FetchAllError, WorldService } from '~/app/WorldService'
import { World } from '~/domain/quests/entity/World'
import { WorldName } from '~/domain/quests/vo/WorldName'

// ハードコーディングでWorldおよびマスタデータが決まっている実装
export class WorldServiceFixedImpl implements WorldService {
  async fetchAll(): Promise<Either<FetchAllError, World[]>> {
    await asyncSleep(300)
    return right([
      World.of({
        name: '天使の大陸' as WorldName,
      }),
      World.of({
        name: '悪魔の巣窟' as WorldName,
      }),
    ])
  }
}
