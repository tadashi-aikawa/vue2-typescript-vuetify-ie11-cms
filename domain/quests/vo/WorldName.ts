declare const _brand: unique symbol
export type WorldName = string & { [_brand]: void }
