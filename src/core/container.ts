import { Registry } from './instance-registry'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class Container {
  private static registry: Registry

  private constructor () {}

  public static getRegistry (): Registry {
    if (!this.registry) {
      this.registry = new Registry()
    }
    return this.registry
  }
}
