import { Container } from '@/core/container'

export function Inject (token: string) {
  return function (target: any, propertyKey: string, index?: number): any {
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
