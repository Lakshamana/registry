import { Injectable } from '@/core'
import { Animal } from './animal'

@Injectable()
export class Cat {
  constructor (private readonly animal: Animal) {}

  walk (): void {
    console.log(`${this.animal?.animalName} is walking`)
  }

  purr (): void {
    console.log(`${this.animal?.animalName} is purring`)
  }
}
