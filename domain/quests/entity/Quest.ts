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
  description: string
}

declare const _brand: unique symbol
export class Quest extends Entity<Props> {
  private [_brand]: void

  static of(props: Props): Quest {
    return new Quest(props.id, props)
  }

  get id(): QuestId {
    return this._props.id
  }

  get world(): World {
    return this._props.world
  }

  get goal(): Goal {
    return this._props.goal
  }

  get beginCity(): City {
    return this._props.beginCity
  }

  get endCity(): City {
    return this._props.endCity
  }

  get beginDate(): DateTime {
    return this._props.beginDate
  }

  get endDate(): DateTime {
    return this._props.endDate
  }

  get level(): Level {
    return this._props.level
  }

  get questOptions(): QuestOption[] {
    return this._props.questOptions
  }

  get description(): string {
    return this._props.description
  }
}
