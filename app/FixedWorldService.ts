import { Either, right } from 'owlelia'
import { asyncSleep } from '~/utils/sleep'
import { FetchAllError, WorldService } from '~/app/WorldService'
import { World } from '~/domain/quests/entity/World'
import { WorldName } from '~/domain/quests/vo/WorldName'
import { Goal } from '~/domain/quests/entity/Goal'
import { GoalName } from '~/domain/quests/vo/GoalName'
import { City } from '~/domain/quests/entity/City'
import { CityName } from '~/domain/quests/vo/CityName'

// ハードコーディングでWorldおよびマスタデータが決まっている実装
export class FixedWorldService implements WorldService {
  async fetchAll(): Promise<Either<FetchAllError, World[]>> {
    await asyncSleep(300)
    return right([
      World.of({
        name: '天使の大陸' as WorldName,
        goals: [
          Goal.of({
            name: 'エンジェル' as GoalName,
            cities: [
              City.of({ name: '神秘の草原' as CityName }),
              City.of({ name: '朝日の祠' as CityName }),
              City.of({ name: '向日葵の街' as CityName }),
            ],
          }),
          Goal.of({
            name: 'ミカエル' as GoalName,
            cities: [
              City.of({ name: '朝日の祠' as CityName }),
              City.of({ name: '向日葵の街' as CityName }),
              City.of({ name: '白の海' as CityName }),
              City.of({ name: '天空への島' as CityName }),
            ],
          }),
          Goal.of({
            name: 'ガブリエル' as GoalName,
            cities: [
              City.of({ name: '天空への島' as CityName }),
              City.of({ name: '天の神殿' as CityName }),
              City.of({ name: '時空の祭壇' as CityName }),
              City.of({ name: '輪廻の架け橋' as CityName }),
            ],
          }),
        ],
      }),
      World.of({
        name: '悪魔の巣窟' as WorldName,
        goals: [
          Goal.of({
            name: 'アトラス' as GoalName,
            cities: [
              City.of({ name: '宵闇の祠' as CityName }),
              City.of({ name: '蛇の道' as CityName }),
              City.of({ name: '溶岩渓谷' as CityName }),
            ],
          }),
          Goal.of({
            name: 'サタン' as GoalName,
            cities: [
              City.of({ name: '溶岩渓谷' as CityName }),
              City.of({ name: '奈落の果て' as CityName }),
              City.of({ name: '永遠なる闇の狭間' as CityName }),
              City.of({ name: '枉死城' as CityName }),
            ],
          }),
        ],
      }),
    ])
  }
}
