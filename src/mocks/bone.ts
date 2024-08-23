import { Inject, Injectable } from '@/core/decorators'
import { Canidae } from './interfaces/canidae'

@Injectable()
export class Bone {
  constructor (@Inject('Canidae') private readonly dog: Canidae) {}

  printOwner (): void {
    console.log(`[owner]: ${this.dog.getAnimal().tag}`)
  }
}
