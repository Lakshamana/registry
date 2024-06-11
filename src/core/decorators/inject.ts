import { Registry } from '../instance-registry'

export function Inject (token: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return Registry.get(token)
      },
      set: function (val: any): void {
        target[propertyKey] = val
      }
    })
  }
}
