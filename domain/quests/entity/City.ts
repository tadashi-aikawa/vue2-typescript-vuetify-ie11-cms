import { Entity } from 'owlelia'
import { CityName } from '~/domain/quests/vo/CityName'
import { GoalName } from '~/domain/quests/vo/GoalName'

interface Props {
  name: CityName
  goalName: GoalName
}

declare const _brand: unique symbol
export class City extends Entity<Props> {
  private [_brand]: void

  static of(props: Props): City {
    return new City(props.name, props)
  }

  get name(): CityName {
    return this._props.name
  }

  get goalName(): GoalName {
    return this._props.goalName
  }
}
