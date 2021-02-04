declare const _brand: unique symbol
export type LevelName = string & { [_brand]: void }
