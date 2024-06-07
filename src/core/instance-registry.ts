/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Constructor } from '@/types'

export class InstanceRegistry {
  private readonly instances: Map<string, any> = new Map()

  public get<T extends Constructor>(target: T): InstanceType<T> {
    if (!this.instances.size) this.init([target])
    return this.instances.get(target.name)
  }

  public init (dependencies: Constructor[]): InstanceRegistry {
    for (const Dep of dependencies) {
      const isInjectable = Reflect.getMetadata('injectable', Dep)
      if (!isInjectable) return

      const paramTypes = Reflect.getMetadata('design:paramtypes', Dep) || []

      const children = paramTypes.map((ParamType: Constructor) => {
        this.init([ParamType])

        let childInstance = this.get(ParamType)
        if (!childInstance) {
          childInstance = new ParamType()
          this.instances.set(ParamType.name, childInstance)
        }

        return childInstance
      })

      if (!this.instances.get(Dep.name)) {
        this.instances.set(Dep.name, new Dep(...children))
      }
    }

    return this
  }
}
