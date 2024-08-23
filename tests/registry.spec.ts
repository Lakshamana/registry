import 'reflect-metadata'
import { Injectable, Registry } from '@/core'
import { Container } from '@/core/container'

@Injectable()
class Animal {
  walk (): string {
    return 'walking'
  }
}

const registryMock = jest.spyOn(Container, 'getRegistry')
  .mockImplementation(() => new Registry())

let registry: Registry

beforeEach(() => {
  registryMock.mockClear()
  registry = Container.getRegistry()
})

describe('method: register', () => {
  it('should register and resolve dependencies by class', () => {
    registry.register([Animal])

    const animal = registry.get(Animal)
    expect(animal).toBeDefined()
    expect(animal.walk()).toBe('walking')
  })

  it('should register and resolve dependencies by token factory', () => {
    registry.register([{ provide: 'animal', useFactory: () => new Animal() }])

    const animalFromClass = registry.get(Animal)
    const animalFromToken = registry.get('animal')

    expect(animalFromClass).toBeUndefined()
    expect(animalFromToken.walk()).toBe('walking')
  })

  it('should register and resolve dependencies by token class type', () => {
    registry.register([{ provide: 'animal', useClass: Animal }])

    const animalFromFactory = registry.get(Animal)
    const animalFromToken = registry.get('animal')

    expect(animalFromFactory).toBeUndefined()
    expect(animalFromToken.walk()).toBe('walking')
  })

  it('should throw an error if the dependency is not marked as @Injectable', () => {
    class Animal {
      walk (): string {
        return 'walking'
      }
    }

    expect(() => registry.register([Animal])).toThrow()
  })
})
