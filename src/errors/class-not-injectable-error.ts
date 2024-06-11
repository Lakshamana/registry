export class ClassIsNotInjectableError extends Error {
  constructor (className: string) {
    super(`Class ${className} is not injectable`)
    this.name = 'ClassIsNotInjectableError'
  }
}
