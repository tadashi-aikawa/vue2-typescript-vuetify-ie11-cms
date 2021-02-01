class Environment {
  private static readonly _values: Environment[] = []

  static readonly DEV = new Environment('dev', '開発環境')
  static readonly STAGING = new Environment('staging', '検証環境')
  static readonly PRODUCTION = new Environment('production', '本番環境')

  private constructor(readonly name: string, readonly japanese: string) {
    Environment._values.push(this)
  }

  static fromName(value: string): Environment | undefined {
    return Environment._values.find((x) => x.name === value)
  }
}

export function getEnv(): Environment {
  return Environment.DEV
}
