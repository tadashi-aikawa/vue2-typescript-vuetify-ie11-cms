import { QuestOptionName } from '~/domain/quests/vo/QuestOptionName'

export class QuestOption {
  private static readonly _values: QuestOption[] = []

  static readonly ONLY_PAYING_USER = new QuestOption(
    '課金ユーザーのみ' as QuestOptionName
  )

  static readonly UNLIMITED_CHALLENGE = new QuestOption(
    '回数制限なし' as QuestOptionName
  )

  private constructor(readonly name: QuestOptionName) {
    QuestOption._values.push(this)
  }

  static fromName(value: string): QuestOption | undefined {
    return QuestOption._values.find((x) => x.name === value)
  }

  static values(): QuestOption[] {
    return this._values
  }
}
