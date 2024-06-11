
import { Injectable, InjectVariable } from '@/core/decorators'

@Injectable()
export class Animal {
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
