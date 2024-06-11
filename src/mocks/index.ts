/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import '../config/module-alias'

import { Registry } from '@/core/instance-registry'
import { Animal } from './animal'
import { Dog } from './dog'
import { Bone } from './bone'

Registry.init([
  Animal,
  {
    provide: 'dog',
    useFactory: () => new Dog(new Animal())
  },
  Bone
])

const dog = Registry.get('dog')
const bone = Registry.get(Bone)

dog.walk()
dog.eat()
bone.printOwner()
