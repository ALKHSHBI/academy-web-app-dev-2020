# Testing applications

More handy links:

- [Presentation Slides]()
- [Workshop Exercises](./EXERCISES.md)
<hr />
- [Cypress Docs]()
- [Jest Docs]()
- [Enzyme Docs]()
- [React Hooks Testing Library Docs]()

* What testing code means
* Why testing code is important
* Test Driven Development (TDD)
* End-to-end (e2e) tests
  * What are e2e tests
  * Cypress as an e2e testing tool
  * Outlook into the future: @dhis2/cli-utils-cypress
* Unit tests
  * What are unit tests
  * Jest as an unit testing tool
  * Watch option & filtering by name
  * Testing Reactjs components: Enzyme
  * Testing Reactjs hooks: @testing-library/react-hooks
    * `renderHook`
    * with context
    * `act` & `wait`
    * `act` and React's batching synchronous use state
* Code sandbox examples don't work in FF but in Chrome

# What testing code means

* Making sure that either bits and pieces of the code or an entire app work as expected
  * Bits and pieces:
    * Making sure that a function and class-methods return an expected value
      for a given input / state
    * Making sure that a component renders expected html for given props
  * Entire apps
    * Making sure that the user can use the app in the intended way
    * Does not rely on testing the code but uses the browser to click/type
      through an app

* Apps and code can be tested manually but it is very time consuming and
  without a dedicated team unreliable

# Why testing code is important

* It costs more time to write tests and code
* It's worth it because
  * It will reduce the amount of user-facing bugs
  * It will reduce the time spend to fix bugs
  * It will reduce the time to confirm bugs
  * It will reduce the extra time to get back into an issue after being
    interrupted to confirm a bug or to have been made aware of a bug

# Test Driven Development (TDD)

* Writing tests before writing actual code

# End-to-end (e2e) tests

* show table of contents

## What are e2e tests

* e2e tests don't test actual code

> End-to-end testing is a technique that tests the entire software product from
> beginning to end to ensure the application flow behaves as expected.
> (https://www.katalon.com/resources-center/blog/end-to-end-e2e-testing/,
> 18.08.2020)

* An application is one end. The user is the other end. e2e tests test the
  entire app from the perspective of the user. Or in other words:
  An application is tested from one end to the other, which includes the user's
  perspective.

## Cypress as an e2e testing tool

* Cypress is a cli tool with a GUI for development for visual testing.
* At dhis2 we're using it as our tool for e2e testing although we're still in
  the early phase.
* The test code looks similar to what jest code looks like, but it uses a
  different assertion library. Jest has its own assertion style while cypress
  uses chai assertsions.
* Allows the developer to inspect the DOM of every stage of the test, which is
  very convenient for writing tests

## Outlook into the future: @dhis2/cli-utils-cypress

* Will ship with all necessary components for writing cypress tests
* Will include utility functions for tests for dhis2-specific logic (like
  logging in)
* Comes with support for feature files / behavior driven development
* Currently under development / heavy subject to change

# Unit tests

* show table of contents

## What are unit tests

* Tests individual units of the code, like functions or classes or even only
  specific class methods.
* Does not cost a lot of time to run
* Can be part of the git workflow, e. g. in the pre-commit hook to prevent
  adding code to the codebase that does not pass the tests

> A good unit test is often small enough that a developer can conceptualize all
> the logic at once.
> (https://mtlynch.io/good-developers-bad-tests/, 18. August 2020)

## Jest as an unit testing tool

* Tool developed by facebook
* Complete unit test package, does not require other packages for testing
  vanilla javascript
* Widely used, so there is a solution for almost all missing functionality

### Simple jest test

```js
function getLabelByType(instance) {
  // if instance if not an object
  // or if the type property is missing
  if (typeof instance.type === 'undefined') {
    throw new Error(`
      No "type" property on instance,
      instance is of type ${typeof instance}.
    `)
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

  return instance.type
}
```

  * The following function will return a label for a given type on an object
    that's passed in as the first argument.
  * Three types are supported by the utility function.
  * If an object with an unhandled type is passed it, the type should be returned
  * If a non-object value is passed in, the function should throw an error

```js
// one describe block
describe('getLabelByType', () => {})

// multiple describe blocks
describe('getLabelByType - Handles types', () => {})
describe('getLabelByType - Edge cases', () => {})
```

  * There are different ways to write jest tests, a very common method is the use
    of the `describe` together with `it` function.
    * One `describe` block covers once scenario
    * One `it` block covers one aspect of the scenario

  * The first parameter passed to `describe` is the title of the scenario
    * I usually just use the function name if there's only one `describe` block
    * If there are more scenarios, I usually prefix the description with the
      function name and a dash
  * The second parameter is a function that contains the `it` blocks

```
describe('getLabelByType', () => {
    it('should return the premium label when the type is "top"', () => {})
    it('should return the top tier label when the type is "mid"', () => {})
    it('should return the value tier label when the type is "low"', () => {})
    it('should return the type value if the type is unknown', () => {})
    it('should throw an error if the ')
})
```

  * As you can see, the describe block now contains an `it` block for each of the
  specifications/requirements you saw earlier.
  * The first argument is the description of the aspect that being tested
  * The second argument is a function that will contain the actual code testing
    the aspect

```js
import { getLabelByType } from './getLabelByType'

    // ...

    it('should return the premium label when the type is "top"', () => {
        const actual = getLabelByType('top')
        const expected = 'Premium tier'
        expect(actual).toBe(expected)
        
        // alternative, shorter, implementation:
        expect(getLabelByType('top')).toBe('Premium tier')
    })

    // ...
```

  * The test is quite simply. The actually returned value for a certain input
    is tested against an expected return value.
  * jest provides the `expect` function that has several utility function for
    making assertions

## Testing Reactjs components: Enzyme

  * `enzyme` is a tool that can be used to test react components with jest
  * Use `mount` to render a hook virtually
  * Use enzyme's documentation to get an overview of all the methods a rendered
    component has: https://enzymejs.github.io/enzyme/docs/api/

```jsx
import React from 'react'
import { mount } from 'enzyme'

const Component = () => <span className="my-class-name" />
const mounted = mount(<Component />)

mounted.hasClass('my-class-name') // true
mounted.hasClass('another-class-name') // false
```

## Testing Reactjs hooks: @testing-library/react-hooks

### `renderHook`

  * expects a function that will call the hook and returns the hook's return
    value
  * `renderHook` will return an object
    * that contains `result.current`:

```js
const { result } = renderHook(() => {
  return useState({ property: 'value' })
})
console.log(result.current) // will print the obect "{ property: 'value' }"
console.log(result.current.property) // will print "value"
```

  * If the hooks that's being tested returns an object,
    `result.current` would be that object

### with context

```js
const wrapper = ({ children }) => (
  <Context.Provider value={42}>
    {children}
  </Context.Provider>
)

const { result } = renderHook(() => useCounter(), { wrapper })
```

  * A wrapper component can be provided
    -> That wrapper can wrap the component with the context

```js
const wrapper = ({ children, number }) => (
  <Context.Provider value={number}>
    {children}
  </Context.Provider>
)

const { result } = renderHook(
  () => useCounter(),
  {
    wrapper,
    initialProps: {
      number: 42,
    },
  }
)
```

  * By providing `initialProps`, the provided objects
    will be passed to the wrapper

### `act` & `waitForNextUpdate`

```js
const useCounter = () => {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter(counter + 1)
  return { counter, increment }
}

it('should', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter())
  expect(result.current.counter).toBe(0)
  
  // perform an asynchronous action
  await act(
    async () => {
      result.current.increment()
      await waitForNextUpdate()
    }
  )

  expect(result.current.counter).toBe(1)
})
```

  * By using the `act` function, the hook's entire life cycle
    can be tested

### `act` and React's batching synchronous use state

# Code sandbox examples don't work in FF but in Chrome

