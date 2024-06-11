import { Inject, Injectable } from '@/core/decorators'
import { Canidae } from './interfaces/canidae'

@Injectable()
export class Bone {
  @Inject('dog') dog: Canidae

  printOwner (): void {
    console.log(`[owner]: ${this.dog.getAnimal().tag}`)
  }
}
