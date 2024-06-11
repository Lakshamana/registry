import { Constructor } from '@/types'

export function Injectable<T extends Constructor> () {
  return function (target: T): void {
    Reflect.defineMetadata('injectable', true, target)
  }
}
