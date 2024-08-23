import 'reflect-metadata'
import { Container, Inject, Injectable, Registry } from '@/core'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IInjectableByToken {}

@Injectable()
class InjectableByTokenClass implements IInjectableByToken {}

class TestClass {
  constructor (
    @Inject(InjectableByTokenClass.name)
    private readonly injectedByTokenInstance: IInjectableByToken
  ) {}

  public getInjectedByTokenInstance (): InjectableByTokenClass {
    return this.injectedByTokenInstance
  }
}

describe('@Inject', () => {
  let registry: Registry

  jest.spyOn(Container, 'getRegistry').mockImplementation(() => new Registry())

  beforeEach(() => {
    registry = Container.getRegistry()
  })

  it('should inject variables into the instance class', () => {
    registry.register([
      { provide: InjectableByTokenClass.name, useClass: InjectableByTokenClass }
    ])

    const instance = new TestClass(
      registry.get(InjectableByTokenClass)
    )

    expect(instance.getInjectedByTokenInstance()).toBeDefined()
  })
})
