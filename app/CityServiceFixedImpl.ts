// ハードコーディングでCityおよびマスタデータが決まっている実装
import { Either, right } from 'owlelia'
import { AllError, CityService } from '~/app/CityService'
import { City } from '~/domain/quests/entity/City'
import { CityName } from '~/domain/quests/vo/CityName'
import { GoalName } from '~/domain/quests/vo/GoalName'

export class CityServiceFixedImpl implements CityService {
  private cities: City[] = [
    City.of({
      name: '神秘の草原' as CityName,
      goalName: 'エンジェル' as GoalName,
    }),
    City.of({
      name: '朝日の祠' as CityName,
      goalName: 'エンジェル' as GoalName,
    }),
    City.of({
      name: '向日葵の街' as CityName,
      goalName: 'エンジェル' as GoalName,
    }),
    City.of({ name: '朝日の祠' as CityName, goalName: 'ミカエル' as GoalName }),
    City.of({
      name: '向日葵の街' as CityName,
      goalName: 'ミカエル' as GoalName,
    }),
    City.of({ name: '白の海' as CityName, goalName: 'ミカエル' as GoalName }),
    City.of({
      name: '天空への島' as CityName,
      goalName: 'ミカエル' as GoalName,
    }),
    City.of({
      name: '天空への島' as CityName,
      goalName: 'ガブリエル' as GoalName,
    }),
    City.of({
      name: '天の神殿' as CityName,
      goalName: 'ガブリエル' as GoalName,
    }),
    City.of({
      name: '時空の祭壇' as CityName,
      goalName: 'ガブリエル' as GoalName,
    }),
    City.of({
      name: '輪廻の架け橋' as CityName,
      goalName: 'ガブリエル' as GoalName,
    }),
    City.of({ name: '宵闇の祠' as CityName, goalName: 'アトラス' as GoalName }),
    City.of({ name: '蛇の道' as CityName, goalName: 'アトラス' as GoalName }),
    City.of({ name: '溶岩渓谷' as CityName, goalName: 'アトラス' as GoalName }),
    City.of({ name: '溶岩渓谷' as CityName, goalName: 'サタン' as GoalName }),
    City.of({ name: '奈落の果て' as CityName, goalName: 'サタン' as GoalName }),
    City.of({
      name: '永遠なる闇の狭間' as CityName,
      goalName: 'サタン' as GoalName,
    }),
    City.of({ name: '枉死城' as CityName, goalName: 'サタン' as GoalName }),
  ]

  all(): Promise<Either<AllError, City[]>> {
    return Promise.resolve(right(this.cities))
  }
}
