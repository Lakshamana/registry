import { Constructor } from '@/types'

export function Injectable<T extends Constructor> () {
  return function (target: T): void {
    console.log('> injected', target.name)
    Reflect.defineMetadata('injectable', true, target)
  }
}
