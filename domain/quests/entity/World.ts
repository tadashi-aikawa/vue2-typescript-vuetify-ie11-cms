import { Entity } from 'owlelia'
import { WorldName } from '~/domain/quests/vo/WorldName'
import { Goal } from '~/domain/quests/entity/Goal'

interface Props {
  name: WorldName
  goals: Goal[]
}

declare const _brand: unique symbol
export class World extends Entity<Props> {
  private [_brand]: void

  static of(props: Props): World {
    return new World(props.name, props)
  }

  get name(): WorldName {
    return this._props.name
  }

  get goals(): Goal[] {
    return this._props.goals
  }
}
