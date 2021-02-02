declare const _brand: unique symbol
export type CityName = string & { [_brand]: void }
