import 'reflect-metadata'
import { Container, Injectable, Registry } from '@/core'

let registry: Registry

@Injectable()
class Animal {
  walk (): string {
    return 'walking'
  }
}

jest.spyOn(Container, 'getRegistry')
  .mockImplementation(() => new Registry())

beforeEach(() => {
  registry = Container.getRegistry()
})

describe('get', () => {
  it('should return a registered class', () => {
    registry.register([Animal])

    const animal = registry.get(Animal)
    expect(animal).toBeDefined()
    expect(animal.walk()).toBe('walking')
  })

  it('should return a registered class using class token', () => {
    registry.register([{ provide: 'animal', useClass: Animal }])

    const animalFromClass = registry.get(Animal)
    const animalFromToken = registry.get('animal')

    expect(animalFromClass).toBeUndefined()
    expect(animalFromToken.walk()).toBe('walking')
  })

  it('should return a registered class using factory token', () => {
    registry.register([{ provide: 'animal', useFactory: () => new Animal() }])

    const animalFromClass = registry.get(Animal)
    const animalFromToken = registry.get('animal')

    expect(animalFromClass).toBeUndefined()
    expect(animalFromToken.walk()).toBe('walking')
  })
})
