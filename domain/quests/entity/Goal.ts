import { Entity } from 'owlelia'
import { GoalName } from '~/domain/quests/vo/GoalName'
import { City } from '~/domain/quests/entity/City'

interface Props {
  name: GoalName
  cities: City[]
}

declare const _brand: unique symbol
export class Goal extends Entity<Props> {
  private [_brand]: void

  static of(props: Props): Goal {
    return new Goal(props.name, props)
  }

  get name(): GoalName {
    return this._props.name
  }

  get cities(): City[] {
    return this._props.cities
  }
}
