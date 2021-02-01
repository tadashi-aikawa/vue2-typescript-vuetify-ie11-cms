/**
 * 指定ミリ秒waitします
 * @param ms
 */
export function asyncSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}
