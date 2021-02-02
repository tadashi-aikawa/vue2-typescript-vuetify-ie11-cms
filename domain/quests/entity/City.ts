import { Entity } from 'owlelia'
import { CityName } from '~/domain/quests/vo/CityName'

interface Props {
  name: CityName
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
}
