/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import '../config/module-alias'

import { Animal } from './animal'
import { Dog } from './dog'
import { Bone } from './bone'
import { Container } from '@/core/container'

const registry = Container.getRegistry().init([
  Animal,
  Bone,
  {
    provide: 'dog',
    useFactory: () => new Dog(new Animal())
  }
])

const dog = registry.get('dog')
const bone = registry.get(Bone)

dog.walk()
dog.eat()
bone.printOwner()
