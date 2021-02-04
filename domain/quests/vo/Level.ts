import { LevelName } from '~/domain/quests/vo/LevelName'
import { MaterialIcon } from '~/utils/types'

export class Level {
  private static readonly _values: Level[] = []

  static readonly EASY = new Level('簡単' as LevelName, {
    name: 'mdi-information',
    color: 'green',
  })

  static readonly NORMAL = new Level('普通' as LevelName, {
    name: 'mdi-alert',
    color: 'orange',
  })

  static readonly HARD = new Level('難しい' as LevelName, {
    name: 'mdi-skull',
    color: 'red',
  })

  private constructor(readonly name: LevelName, readonly icon: MaterialIcon) {
    Level._values.push(this)
  }

  static fromName(value: string): Level | undefined {
    return Level._values.find((x) => x.name === value)
  }

  static values(): Level[] {
    return this._values
  }
}
