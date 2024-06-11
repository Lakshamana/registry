import { Injectable } from '@/core/decorators'
import { Animal } from './animal'
import { Canidae } from './interfaces/canidae'

@Injectable()
export class Dog implements Canidae {
  constructor (private readonly animal: Animal) {}

  walk (): void {
    console.log(`${this.animal?.animalName} is walking`)
  }

  eat (): void {
    this.animal.eat()
  }

  getAnimal (): Animal {
    return this.animal
  }
}
