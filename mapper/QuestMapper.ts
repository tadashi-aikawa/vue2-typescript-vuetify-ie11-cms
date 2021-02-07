import { DateTime, Either, left, right } from 'owlelia'
import * as Client from '~/external/api/ApiClient'
import { Quest } from '~/domain/quests/entity/Quest'
import { QuestId } from '~/domain/quests/vo/QuestId'
import { World } from '~/domain/quests/entity/World'
import { Goal } from '~/domain/quests/entity/Goal'
import { City } from '~/domain/quests/entity/City'
import { Level } from '~/domain/quests/vo/Level'
import { QuestOption } from '~/domain/quests/vo/QuestOption'
import { WorldName } from '~/domain/quests/vo/WorldName'
import { GoalName } from '~/domain/quests/vo/GoalName'
import { CityName } from '~/domain/quests/vo/CityName'
import { AppError } from '~/utils/error'
import { allPresent } from '~/utils/types'

export class MapperError extends AppError {
  code = 'MapperError'
  name = 'Questのマッピングに失敗しました'
}

export function apiToDomain(quest: Client.Quest): Either<MapperError[], Quest> {
  const level = Level.fromName(quest.level.name)

  if (!level) {
    return left([
      new MapperError(
        `Levelのパースに失敗しました。パースした値: ${quest.level.name}`
      ),
    ])
  }

  const questOptions = quest.options.map((x) => QuestOption.fromName(x))
  if (!allPresent(questOptions)) {
    return left([
      new MapperError(
        `QuestOptionのパースに失敗しました。パースした値: ${quest.options}`
      ),
    ])
  }

  return right(
    Quest.of({
      id: quest.id as QuestId,
      world: World.of({
        name: quest.world.name as WorldName,
      }),
      goal: Goal.of({
        name: quest.goal.name as GoalName,
        worldName: quest.world.name as WorldName,
      }),
      beginCity: City.of({
        name: quest.city.begin.name as CityName,
        goalName: quest.goal.name as GoalName,
      }),
      endCity: City.of({
        name: quest.city.end.name as CityName,
        goalName: quest.goal.name as GoalName,
      }),
      beginDate: DateTime.of(quest.date.begin),
      endDate: DateTime.of(quest.date.end),
      level,
      questOptions,
      description: quest.description,
    })
  )
}

export function domainToApi(quest: Quest): Client.Quest {
  return {
    id: quest.id,
    world: {
      name: quest.world.name,
    },
    goal: {
      name: quest.goal.name,
    },
    city: {
      begin: {
        name: quest.beginCity.name,
      },
      end: {
        name: quest.endCity.name,
      },
    },
    date: {
      begin: quest.beginCity.name,
      end: quest.endCity.name,
    },
    level: {
      name: quest.level.name,
    },
    description: quest.description,
    options: quest.questOptions.map((x) => x.name),
  }
}
