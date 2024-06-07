import { Constructor } from '@/types'

export class InstanceLoader<T extends Constructor> {
  constructor (private readonly Clazz: T) { }

  public load<T>(...args: any): T {
    return new this.Clazz(...args)
  }
}
