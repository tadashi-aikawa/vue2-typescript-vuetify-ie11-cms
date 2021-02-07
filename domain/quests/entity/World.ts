import { Entity } from 'owlelia'
import { WorldName } from '~/domain/quests/vo/WorldName'

interface Props {
  name: WorldName
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
}
