import { Container } from '../container'

export function Inject (token: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return Container.getRegistry().get(token)
      },
      set: function (val: any): void {
        target[propertyKey] = val
      }
    })
  }
}
