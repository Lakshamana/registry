import 'reflect-metadata'
import { Injectable } from '@/core'

describe('@Injectable', () => {
  it('should mark class as injectable', () => {
    @Injectable()
    class InjectableClass {}

    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    class NotInjectableClass {}

    expect(Reflect.getMetadata('injectable', InjectableClass)).toBe(true)
    expect(Reflect.getMetadata('injectable', NotInjectableClass)).toBeFalsy()
  })
})
