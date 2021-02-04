import { DateTime, Entity } from 'owlelia'
import { Goal } from '~/domain/quests/entity/Goal'
import { World } from '~/domain/quests/entity/World'
import { City } from '~/domain/quests/entity/City'
import { Level } from '~/domain/quests/vo/Level'
import { QuestOption } from '~/domain/quests/vo/QuestOption'
import { QuestId } from '~/domain/quests/vo/QuestId'

interface Props {
  id: QuestId
  world: World
  goal: Goal
  beginCity: City
  endCity: City
  beginDate: DateTime
  endDate: DateTime
  level: Level
  questOptions: QuestOption[]
}

declare const _brand: unique symbol
export class Quest extends Entity<Props> {
  private [_brand]: void

  static of(props: Props): Quest {
    return new Quest(props.id, props)
  }
}
