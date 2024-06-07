/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import '../config/module-alias'

import { Injectable, InjectVariable } from '@/core/decorators'
import { InstanceRegistry } from '@/core/instance-registry'

@Injectable()
class Animal {
  @InjectVariable()
  animalName: string

  @InjectVariable('SPECIES_NAME')
  species: string

  get tag (): string {
    return `${this.animalName}: [species=${this.species}]`
  }

  eat (): void {
    console.log(`${this.tag} is eating`)
  }
}

@Injectable()
class Dog {
  constructor (private readonly animal: Animal) {}

  walk (): void {
    console.log(`${this.animal?.animalName} is walking`)
  }

  eat (): void {
    this.animal.eat()
  }
}

const registry = new InstanceRegistry().init([Animal, Dog])
const dog = registry.get(Dog)

dog.walk()
dog.eat()
