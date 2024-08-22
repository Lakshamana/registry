import { ClassIsNotInjectableError } from '@/errors'
import type { Constructor, Provider } from '@/types'

export class Registry {
  constructor (private readonly instances = new Map<string, any>()) {}

  public get<T extends Constructor>(target: T | string): InstanceType<T> {
    if (typeof target === 'string') return this.instances.get(target)

    if (!this.instances.size) this.register([target])
    return this.instances.get(target.name)
  }

  public register (dependencies: Array<Constructor | Provider>): this {
    for (const dep of dependencies) {
      let Instance = dep

      if ('useFactory' in Instance) {
        const { useFactory, provide } = Instance
        if (!useFactory || !provide) continue

        if (!this.instances.get(provide)) {
          this.instances.set(provide, useFactory())
        }

        continue
      }

      let useProviderName: string = ''
      if ('useClass' in Instance) {
        const { useClass, provide } = Instance
        if (!useClass || !provide) continue

        Instance = useClass
        useProviderName = provide
      }

      const useClassName = useProviderName || Instance.name

      const isInjectable = Reflect.getMetadata('injectable', Instance)
      if (!isInjectable) throw new ClassIsNotInjectableError(useClassName)

      const paramTypes =
        Reflect.getMetadata('design:paramtypes', Instance) || []

      const children = paramTypes.map((ParamType: Constructor) => {
        this.register([ParamType])

        let childInstance = this.get(ParamType)
        if (!childInstance) {
          childInstance = new ParamType()
          this.instances.set(ParamType.name, childInstance)
        }

        return childInstance
      })

      if (!this.instances.get(useClassName)) {
        this.instances.set(useClassName, new Instance(...children))
      }
    }

    return this
  }
}
