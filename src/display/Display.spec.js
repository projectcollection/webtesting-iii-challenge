// Test away!
import React from 'react';
import renderer from 'react-test-renderer';
import {render, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'

import Display from './Display'

afterEach(cleanup)

describe('<Display/>', () => {
    test('should match snapshot', () => {
        const tree = renderer.create(<Display/>).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should match snapshot', () => {
        const tree = renderer.create(<Display
            locked = {false}
            closed = {false}
            />).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should match snapshot', () => {
        const tree = renderer.create(<Display
            locked = {false}
            closed = {true}
            />).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should match snapshot', () => {
        const tree = renderer.create(<Display
            locked = {true}
            closed = {true}
            />).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('displays if gate is open/closed and if it is locked/unlocked', () => {
        const {getByText} = render(<Display
            locked={false}
            closed={false}
            />)
        
        getByText(/Unlocked/i)
        getByText(/Open/i)
    });

    test('displays `Closed` if the `closed` prop is `true` and `Open` if otherwise', () => {
        const {getByText, rerender} = render(<Display
            closed={true}
            />)
        getByText(/Closed/i)

        rerender(<Display
            closed={false}
            />)
        getByText(/Open/i)
    });

    test('displays `Locked` if the `locked` prop is `true` and `Unlocked` if otherwise', () => {
        const {getByText, rerender} = render(<Display
            locked={true}
            />)
        getByText(/Locked/i)

        rerender(<Display
            locked={false}
            />)
        getByText(/Unlocked/i)
    });
})