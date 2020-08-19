/**
 * =======
 * This file contains the component test exercises
 *
 * Overview:
 *   * Exercise 1: Cover a component (getLabelByType) with tests
 *   * Exercise 2: Add functionality to the component based on existing tests
 *
 *   NOTE: The are more non-bonus exercises in the unit.test.js!
 *   Bonus tasks:
 *   * Exercise 3: Set context values and test the outcome
 *   * Exercise 4: Mock a hook used by a component to test the component states
 *
 * =======
 */

/**
 * This needs to be done.
 * Normally this would be done in the src/setupTests.js
 * For more information, please have a look a the docs:
 * https://enzymejs.github.io/enzyme/docs/installation/react-16.html
 */
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() })

/**
 * =======
 * Exercise 1
 *
 * In this exercise an existing component should be covered with tests.
 * The individual `it`-blocks already exist but lack the testing-code.
 * =======
 */
import { mount } from "enzyme"
import { PropTypes } from '@dhis2/prop-types'
import React from "react"

/**
 * Just a very simple component
 * that will always render the same content
 */
const SpanComponent = () => <span className="i-am-a-span">Text!</span>

/**
 * This component renders as many `SpanComponent`s as instructed
 * By providing the `spanCount` prop, the amount of `SpanComponent`s can
 * be controlled
 *
 * <Component spanCount={4} /> will render four `SpanComponent`s
 */
const ExerciseOneComponent = props => {
  const { spanCount, className } = props
  const spans = []

  // This loop will iterate "spanCount" times
  for (let i = 0;
       i < spanCount;
       i = i + 1
  ) {
    // In every iteration, a "SpanComponent" is added to the "spans" array
    // The "key" prop is required by react when using arrays of components.
    const span = <SpanComponent key={i} />
    spans.push(span)
  }

  // The container will have the class name that's provided through the props
  // If "prop.className" is undefined (because it wasn't provided), no
  // class name will be added to the div
  return (
    <div className={props.className}>
      {// Render all spans in the array
        spans}
    </div>
  )
}

ExerciseOneComponent.propTypes = {
  spanCount: PropTypes.number.isRequired,
  className: PropTypes.string,
}

describe("Component tests", () => {
  it("shoud render three spans when the spanCount is 3", () => {})

  it('should add the class "container" to the component\'s container element', () => {})
})

/**
 * =======
 * Exercise 2
 *
 * In this exercise, similarly to the second exercise in the
 * unit.test.js, a component needs to be created based
 * on existing tests.
 * =======
 */

/**
 * This component will render a list of data elements
 * provided through the props
 */
const ExerciseTwoComponent = ({ dataElements }) => ()

ExerciseTwoComponent.propTypes = {
  dataElement: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    })
  )
}

describe('Implement the component for the following tests', () => {
  const dataElements = [
    { id: 'id1', displayName: 'Data element 1' },
    { id: 'id2', displayName: 'Data element 2' },
    { id: 'id3', displayName: 'Data element 3' },
    { id: 'id4', displayName: 'Data element 4' },
  ]

  it('should have a "li" for every data element', () => {
    const component = mount(
      <ExerciseTwoComponent dataElements={dataElements} />
    )

    const dataElementLiElements = component.find('li.data-element')
    expect(dataElementLiElements.length).toBe(dataElements.length)
  })

  it('should use the id as key on each li element', () => {
    const component = mount(
      <ExerciseTwoComponent dataElements={dataElements} />
    )
    const dataElementLiElements = component.find('li.data-element')

    dataElementLiElements.forEach((element, index) => {
      expect(element.key()).toBe(dataElements[index].id)
    })
  })
})

/**
 * =======
 * BONUS Exercise 3
 *
 * In this exercise the component that should be tested is using
 * React's context. In order to see if the component produces the right
 * output, the context value has to be overwritten.
 * =======
 */
import { useContext } from 'react'

// This context will have the default value: { language: 'English' }
const ExerciseThreeContext = React.createContext({ language: 'English' })

const ExerciseThreeComponent = () => {
  // Gets the context's value
  // If none has been set explicitly, the default value will be provided
  const { language } = useContext(ExerciseThreeContext)

  return (
    <p>
      The current language is:<br />
      <span className="language">{language}</span>
    </p>
  )
}

describe(
  'The component needs to display what is provided through context',
  () => {
    it('should display the default language when no value has been provided', () => {})

    it('should display the "German" language when the context has that value', () => {})
  }
)

/**
 * =======
 * BONUS Exercise 4
 *
 * The hook `useExerciseFourData` provides a loading, error and data state.
 * As the result is unpredictable, the hook can be mocked in order to tests
 * the component of this exercise properly.
 *
 * The hook is already mocked, but the correct return values must be set for
 * each test case (`it` block)
 * =======
 */
import { useExerciseFourData } from './extraFiles/useExerciseFourData'

// The call of the "mock" function will make sure that the actual
// "useExerciseFourData" hook is not imported. Instead we'll get a stub
// (a placeholder function) that we can manipulate and inspect.
jest.mock('./extraFiles/useExerciseFourData')

/**
 * This component will render
 *  * 'Loading...' when loading is true
 *  * The error message when an error occured
 *  * The title, subtitle and description of the data
 */
const ExerciseFourComponent = () => {
  const { loading, error, data } = useExerciseFourData()

  if (loading) {
    return <p className="loading">Loading...</p>
  }

  if (error) {
    return (
      <p>
        Something went wrong!
        <span className="error">{error.message}</span>
      </p>
    )
  }

  return (
    <div className="container">
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
      <p>{data.description}</p>
    </div>
  )
}

describe('The hook needs to be mocked in order to create predictable tests', () => {
  // the function provided to `afterEach` will be executed
  // after every test execution
  afterEach(() => {
    // This will reset the mock to make sure that it's like new
    // in every `it` block
    useExerciseFourData.mockClear()
  })

  it('should display loading initially', () => {
    // @TODO: Mock the return value of `useExerciseFourData`
    // so that this test works

    const mounted = mount(<ExerciseFourComponent />)
    const loading = mounted.find('.loading')

    expect(loading.exists()).toBe(true)
  })

  it('should display an error when retrieving the data fails', () => {
    // @TODO: Mock the return value of `useExerciseFourData`
    // so that this test works

    const mounted = mount(<ExerciseFourComponent />)
    const error = mounted.find('.error')

    expect(error.exists()).toBe(true)
    expect(error.text()).toBe('I am an error message')
  })

  it('should display the title when retrieving the data succeeds', () => {
    // @TODO: Mock the return value of `useExerciseFourData`
    // so that this test works

    const mounted = mount(<ExerciseFourComponent />)
    const title = mounted.find('h1')

    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('The title')
  })

  it('should display the subtitle when retrieving the data succeeds', () => {
    // @TODO: Mock the return value of `useExerciseFourData`
    // so that this test works

    const mounted = mount(<ExerciseFourComponent />)
    const subtitle = mounted.find('h2')

    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('The subtitle')
  })

  it('should display the description when retrieving the data succeeds', () => {
    // @TODO: Mock the return value of `useExerciseFourData`
    // so that this test works

    const mounted = mount(<ExerciseFourComponent />)
    const description = mounted.find('p')

    expect(description.exists()).toBe(true)
    expect(description.text()).toBe('The description')
  })
})
