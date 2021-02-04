declare const _brand: unique symbol
export type QuestOptionName = string & { [_brand]: void }
