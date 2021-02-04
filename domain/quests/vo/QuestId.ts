declare const _brand: unique symbol
export type QuestId = string & { [_brand]: void }
