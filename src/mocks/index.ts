/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import '../config/module-alias'

import { Animal } from './animal'
import { Dog } from './dog'
import { Bone } from './bone'
import { Container } from '@/core/container'
import { Cat } from './cat'

const registry = Container.getRegistry().register([
  Animal,
  Bone,
  {
    provide: 'dog',
    useFactory: () => new Dog(new Animal())
  },
  {
    provide: 'cat',
    useClass: Cat
  }
])

const dog = registry.get('dog')
const bone = registry.get(Bone)
const cat = registry.get('cat')

dog.walk()
dog.eat()
bone.printOwner()

cat.purr()
