/**
 * =======
 * This file contains the unit test exercises
 *
 * Overview:
 *   * Exercise 1: Cover a function (getLabelByType) with tests
 *   * Exercise 2: Add functionality to the function based on existing tests
 *
 *   NOTE: The are more non-bonus exercises in the component.test.js!
 *   Bonus tasks:
 *   * Exercise 3: Mock a function that has indeterministic behavior
 *   * Exercise 4: Test a react hook
 *
 * =======
 */

/*
 * This is the function that will be tested in this file.
 * @param {Object} instance
 * @returns {string}
 */
function getLabelByType(instance) {
  // if instance if not an object
  // or if the type property is missing
  if (typeof instance.type === 'undefined') {
    throw new Error(`No "type" property on instance, instance is of type ${typeof instance}.`)
  }

  if (instance.type === 'top') {
    return 'Premium tier'
  }

  if (instance.type === 'mid') {
    return 'Top tier'
  }

  if (instance.type === 'low') {
    return 'Value tier'
  }

  const unusable = instance.unusable
  if (instance.type === 'broken' && unusable) {
    return "Handyman's version (for desperates)"
  }

  if (instance.type === 'broken') {
    return "Handyman's version"
  }

  return instance.type
}

function giveMeANumber() {
  if (mockMeFunction()) {
    return 42
  }

  return 23
}

/**
 * =======
 * Exercise 1
 *
 * This exercise is the exercise that was shown during the presentation.
 * You can have a loot at the slides if you want to see them.
 * One `it` block already has the solution as it was demonstrated as well.
 * =======
 */

describe('getLabelByType - Exercise 1', () => {
  // Solution from presentation
  it('should return the premium label when the type is "top"', () => {
    const actual = getLabelByType({ type: 'top' })
    const expected = 'Premium tier'
    expect(actual).toBe(expected)

    // alternative, shorter, implementation:
    expect(getLabelByType({ type: 'top' })).toBe('Premium tier')
  })

  /**
   * @TODO:
   *  Complete the missing tests
   */
  it('should return the top tier label when the type is "mid"', () => {
    const actual = getLabelByType({ type: 'mid' })
    const expected = 'Top tier'
    expect(actual).toBe(expected)
  })

  it('should return the value tier label when the type is "low"', () => {
    const actual = getLabelByType({ type: 'low' })
    const expected = 'Value tier'
    expect(actual).toBe(expected)
  })

  it('should return the type value if the type is unknown', () => {
    const actual = getLabelByType({ type: 'unknown-type' })
    const expected = 'unknown-type'
    expect(actual).toBe(expected)
  })

  // BONUS step!
  it('should throw an error if the argument is not an object', () => {
    // The following docs: https://jestjs.io/docs/en/expect#tothrowerror
    // contain information how to handle errors/exceptions
    const aFunctionThatShouldThrow = () => getLabelByType("I don't have a type property")
    expect(aFunctionThatShouldThrow).toThrow(Error)
  })
})

/**
 * =======
 * Exercise 2
 * =======
 *
 * TODO: You have to uncomment the following tests!
 *
 * This exercise is about getting a sense for Test Driven Development (TDD).
 * That means that tests are being written before the actual code.
 * In this case the tests already exist, only the functionality of
 * the `getLabelByType` function has to be extended.
 */
describe('getLabelByType - Exercise 2', () => {
  /*
   * This test covers the type "broken"
   */
  it('should return the broken tier label when type if "broken"', () => {
    const actual = getLabelByType({ type: 'broken' })
    const expected = 'Handyman\'s version'
    expect(actual).toBe(expected)
  })

  /*
   * This test covers the "unusable" flag
   */
  it('should respect the unusable flag on the object', () => {
    const withoutFlag = getLabelByType({ type: 'broken' })
    expect(withoutFlag).toBe('Handyman\'s version')
  
    const withFalsyFlag = getLabelByType({ type: 'broken', unusable: false })
    expect(withFalsyFlag).toBe('Handyman\'s version')
  
    const withTruthyFlag = getLabelByType({ type: 'broken', unusable: true })
    expect(withTruthyFlag).toBe('Handyman\'s version (for desperates)')
  })
})

/**
 * =======
 * BONUS EXERCISES
 *
 * These exercises are meant as additional challenges that you could work on
 * after the workshop if you want to dig deeper into the testing world with
 * jest or if you're participating during the workshop, and you're done with
 * the component tests, while there's still some time left.
 * =======
 */

import { mockMeFunction } from './extraFiles/mockMeFunction'
jest.mock('./extraFiles/mockMeFunction')

/**
 * =======
 * BONUS Exercise 3
 *
 * In the following tests the `giveMeANumber` function uses the
 * `mockMeFunction` internally, which makes the return value
 * indeterministic.
 *
 * By mocking the return value of the `mockMeFunction`,
 * the `giveMeANumber` function can be tested properly
 * =======
 */
describe('Mocking a local JavaScript module', () => {
  afterEach(() => {
    // Reset the "mockMeFunction" after every "it" block.
    // It will behave as if it wouldn't have been called in the previous if-blocks
    mockMeFunction.mockClear()
  })

  it('should return 42 if mockMeFunction returns true', () => {
    // You need to mock the implementation of the `mockMeFunction`
    // to restrict the return value of `giveMeANumber` is always "42"
    mockMeFunction.mockImplementationOnce(() => true)
    const actual = giveMeANumber()
    const expected = 42
    expect(actual).toBe(42)
  })

  it('should return 42 if mockMeFunction returns true', () => {
    // You need to mock the implementation of the `mockMeFunction`
    // to restrict the return value of `giveMeANumber` is always "42"
    mockMeFunction.mockImplementationOnce(() => false)
    const actual = giveMeANumber()
    const expected = 23
    expect(actual).toBe(23)
  })
})

/**
 * ========
 * BONUS Exercise 4
 *
 * You can take a look at the documentation of the React Hooks testing library:
 * https://react-hooks-testing-library.com/usage/advanced-hooks
 *
 * Your task is to implement the actual hook based on the test code
 * ========
 */
import { useState } from 'react'
const useCounter = start => {
  const [counter, setCounter] = useState(start)
  const increment = () => setCounter(counter + 1)

  return { counter, increment }
}

import { renderHook, act } from '@testing-library/react-hooks'

describe('Testing a simple react hook', () => {
  it('should return the same counter that\'s provided initially', () => {
    const { result } = renderHook(() => useCounter(3))
    expect(result.current.counter).toBe(3)
  })

  it('should increment the counter when calling the increment function', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCounter(0))
    expect(result.current.counter).toBe(0)

    // with "act" we can proceed the asynchronous hook
    await act(async () => {
      result.current.increment()

      // This will wait until the hook has returned different values
      await waitForNextUpdate()

      expect(result.current.counter).toBe(1)
    })
  })
})
