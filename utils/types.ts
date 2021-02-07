export type Nullable<T> = T | null | undefined

export interface MaterialIcon {
  name: `mdi-${string}`
  color: string
}

export type JsonString = string

/**
 * すべてが有効値であるかを確認します
 * @param values
 */
export function allPresent<T>(values: (T | undefined | null)[]): values is T[] {
  return values.every((x) => x !== undefined && x !== null)
}
