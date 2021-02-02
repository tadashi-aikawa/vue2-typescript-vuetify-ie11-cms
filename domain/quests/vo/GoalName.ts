declare const _brand: unique symbol
export type GoalName = string & { [_brand]: void }
