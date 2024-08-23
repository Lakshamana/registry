import 'reflect-metadata'
import { InjectVariable } from '@/core'

process.env.TEST_VARIABLE = 'test-variable'
process.env.TEST_VARIABLE_NAME = 'test-variable-name'

class TestClass {
  @InjectVariable() testVariable: string
  @InjectVariable('TEST_VARIABLE_NAME') name: string
}

class TestNotFoundVariablesClass {
  @InjectVariable() notFoundVariable: string
  @InjectVariable('THIS_VAR_DOESNT_EXIST') name: string
}

describe('@InjectVariable', () => {
  it('should inject variables into the instance class', () => {
    const instance = new TestClass()

    expect(instance.testVariable).toBe('test-variable')
    expect(instance.name).toBe('test-variable-name')
  })

  it('should not inject variables into the instance class if they are not found', () => {
    const instance = new TestClass()

    expect(instance.testVariable).toBe('test-variable')
    expect(instance.name).toBe('test-variable-name')
  })

  it('should not inject variables into the instance class if they are not found', () => {
    const instance = new TestNotFoundVariablesClass()

    expect(instance.notFoundVariable).toBeUndefined()
    expect(instance.name).toBeUndefined()
  })
})
