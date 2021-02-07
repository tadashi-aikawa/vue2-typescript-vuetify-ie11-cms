import { Entity } from 'owlelia'
import { GoalName } from '~/domain/quests/vo/GoalName'
import { WorldName } from '~/domain/quests/vo/WorldName'

interface Props {
  name: GoalName
  worldName: WorldName
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

  get worldName(): WorldName {
    return this._props.worldName
  }
}
