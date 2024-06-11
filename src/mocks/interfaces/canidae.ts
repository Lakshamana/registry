import { Animal } from '../animal'

export interface Canidae {
  walk: () => void
  eat: () => void
  getAnimal: () => Animal
}
