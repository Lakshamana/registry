export function InjectVariable (variable?: string): any {
  return function (target: any, propertyKey: string, index?: number): void {
    let value = variable
      ? process.env[variable]
      : process.env[getVariableTag(propertyKey)]

    const get = function (): string {
      return value as string
    }

    const set = function (newValue: string): void {
      value = newValue
    }

    Object.defineProperty(target, propertyKey, { get, set })
  }
}

const getVariableTag = (key: string): string => {
  return key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toUpperCase()
}
