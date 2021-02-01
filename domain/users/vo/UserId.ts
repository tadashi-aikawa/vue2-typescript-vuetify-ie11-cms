declare const _brand: unique symbol
export type UserId = string & { [_brand]: void }
