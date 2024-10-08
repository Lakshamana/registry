# Registry

[![Build Status](https://app.travis-ci.com/Lakshamana/registry.svg?token=5TkPokWmq84tfapeZkyx&branch=main)](https://app.travis-ci.com/Lakshamana/registry)

Are you tired of creating a thousand factory files?

Are you a lazy programmer (won't judge you tbh) and just want to do your thing and let the computer do the rest?

Are you tired of having to manually register your dependencies?

[Your problems are now over](https://www.youtube.com/watch?v=9bU2Vh8rwm8)

## Description
Registry is a simple library that enable you to register and resolve dependencies automatically either via class or token.

## Installation
```bash
$ npm install --save @lakshamana/registry
```

## Usage
```typescript
// Animal.ts
import { Injectable, InjectVariable } from '@/core/decorators'

@Injectable()  // make sure to add this decorator to the classes you want to make injectable
export class Animal {
  @InjectVariable() animalName: string  // make sure you have set `ANIMAL_NAME` in your env variables

  @InjectVariable('SPECIES_NAME') species: string  // you can use a custom env variable name, instead

  get tag (): string {
    return `${this.animalName}: [species=${this.species}]`
  }

  eat (): void {
    console.log(`${this.tag} is eating`)
  }
}

// Bone.ts
export interface Canidae {
  walk: () => void
  eat: () => void
  getAnimal: () => Animal
}

@Injectable()
export class Bone {
  @Inject('dog') dog: Canidae  // inject instance via token, useful to work with interfaces

  printOwner (): void {
    console.log(`[owner]: ${this.dog.getAnimal().tag}`)
  }
}

// main.ts
const registry = Container.getRegistry()  // get a registry singleton

registry.register([
  Animal,             // pass your classes to the registry
  Bone,
  {                   // pass your instances using a token and a provider factory
    provide: 'dog',
    useFactory: () => new Dog(new Animal())
  },
  {                   // you can pass your instances as a class as well
    provide: 'cat',
    useClass: Cat
  }
])

// You can also get manually the instances from the registry
const animal = registry.get(Animal)
animal.eat()  // <animalName>: [species=<species>] is eating
```

Notice that, if you're running TypeScript 5.x you may want to declare class properties from inside receiver constructor, like this:
```typescript
class Class {
  constructor(
    @Inject() private readonly instance: AnotherInstance  // if you annotated `AnotherInstance` with `@Injectable()`
  ) {}

  method () {
    // this.instance should be available here
  }
}
```

## API

Brief API and type definitions description

### Container
This will (wait for it...) contain the registry as a singleton object to be used through your application

- `static getRegistry (): Registry`
  - Gets/creates and returns a registry singleton

### Registry

- `register (dependencies: Array<Constructor | Provider>): Registry`
  - Registers the providers into the registry
- `get<T extends Constructor>(target: T | string): InstanceType<T>`
  - Retrieves a dependency from the registry by class or token string

### Decorators
This will help you to make your classes injectable, inject your variables or instances

- `@Injectable()`: class decorator
  - Use it to annotate the classes you need to be injectable
- `@Inject(token: string)`: property decorator
  - Use it to annotate class properties you need instances to be injected to
- `@InjectVariable(key?: string)`: property decorator
  - Use it to annotate class properties you need variables to be injected to

## Running examples from source code

Clone this repository, then run:
```bash
$ npm install
$ cp .env.example .env
$ npm run dev
```
## Testing
```bash
$ npm test
$ npm run test:watch
$ npm run test:ci  # check coverage
$ npm run test:staged
```

## Contributing
Feel free to open issue and open PRs with due tests, and I'll check as soon as I can.

Notice that this project is using [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for versioning and commit message pattern respectively, so make sure to follow it. PRs that don't follow these patterns or don't have tests may be rejected.
