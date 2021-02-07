// ハードコーディングでGoalおよびマスタデータが決まっている実装
import { Either, right } from 'owlelia'
import { AllError, GoalService } from '~/app/GoalService'
import { Goal } from '~/domain/quests/entity/Goal'
import { GoalName } from '~/domain/quests/vo/GoalName'
import { WorldName } from '~/domain/quests/vo/WorldName'

export class GoalServiceFixedImpl implements GoalService {
  private goals: Goal[] = [
    Goal.of({
      name: 'エンジェル' as GoalName,
      worldName: '天使の大陸' as WorldName,
    }),
    Goal.of({
      name: 'ミカエル' as GoalName,
      worldName: '天使の大陸' as WorldName,
    }),
    Goal.of({
      name: 'ガブリエル' as GoalName,
      worldName: '天使の大陸' as WorldName,
    }),
    Goal.of({
      name: 'アトラス' as GoalName,
      worldName: '悪魔の巣窟' as WorldName,
    }),
    Goal.of({
      name: 'サタン' as GoalName,
      worldName: '悪魔の巣窟' as WorldName,
    }),
  ]

  all(): Promise<Either<AllError, Goal[]>> {
    return Promise.resolve(right(this.goals))
  }
}
