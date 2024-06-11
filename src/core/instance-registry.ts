/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Constructor, ProviderRef } from '@/types'

export class Registry {
  private static readonly instances: Map<string, any> = new Map()

  public static get<T extends Constructor>(
    target: T | string
  ): InstanceType<T> {
    if (typeof target === 'string') return this.instances.get(target)

    if (!this.instances.size) this.init([target])
    return this.instances.get(target.name)
  }

  public static register<T extends Constructor>(target: Array<T | ProviderRef>): void {
    Registry.init(target)
  }

  public static init (dependencies: Array<Constructor | ProviderRef>): void {
    for (const Instance of dependencies) {
      if (typeof Instance === 'object') {
        const { useFactory, provide } = Instance
        if (!useFactory || !provide) continue

        this.instances.set(provide, useFactory())
        continue
      }

      const isInjectable = Reflect.getMetadata('injectable', Instance)
      if (!isInjectable) return

      const paramTypes =
        Reflect.getMetadata('design:paramtypes', Instance) || []

      const children = paramTypes.map((ParamType: Constructor) => {
        this.init([ParamType])

        let childInstance = this.get(ParamType)
        if (!childInstance) {
          childInstance = new ParamType()
          this.instances.set(ParamType.name, childInstance)
        }

        return childInstance
      })

      if (!this.instances.get(Instance.name)) {
        this.instances.set(Instance.name, new Instance(...children))
      }
    }
  }
}
