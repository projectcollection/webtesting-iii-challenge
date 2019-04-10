// Test away!
import React from 'react';
import renderer from 'react-test-renderer';
import {render, cleanup, fireEvent} from 'react-testing-library';
import 'jest-dom/extend-expect'

import Controls from './Controls';

afterEach(cleanup)

describe('<Controls/>', () => {
    test('should match snapshot', () => {
        const tree = renderer.create(<Controls/>).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should match snapshot', () => {
        const tree = renderer.create(<Controls 
                locked={false}
                closed={false}
            />).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should match snapshot', () => {
        const tree = renderer.create(<Controls 
                locked={true}
                closed={false}
            />).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should match snapshot', () => {
        const tree = renderer.create(<Controls 
                locked={true}
                closed={true}
            />).toJSON()

        expect(tree).toMatchSnapshot()
    });

    test('should call toggleLocked() if lock button is clicked and active', () => {
        const mockToggleLocked = jest.fn()
        const {queryByText, getByText} = render(<Controls
                locked={false}
                closed={true}
                toggleLocked={mockToggleLocked}
            />);

        const toggleBtn = queryByText(/Lock Gate/i);
        fireEvent.click(toggleBtn);

        expect(mockToggleLocked).toHaveBeenCalledTimes(1);
        getByText('Unlock Gate')
    });

    test('should call toggleClosed() if toggle close button is clicked and active', () => {
        const mockToggleClosed = jest.fn()
        const {queryByText} = render(<Controls
                locked={false}
                closed={false}
                toggleClosed={mockToggleClosed}
            />);

        const toggleBtn = queryByText(/Close Gate/i);
        fireEvent.click(toggleBtn);

        expect(mockToggleClosed).toHaveBeenCalledTimes(1);
    });

    test('locked toggle button disabled if gate is open', () => {
        const {getByTestId} = render(<Controls
                closed={false}
            />);

        expect(getByTestId('toggle-lock')).toBeDisabled();
    });

    test('close toggle button disabled if gate is locked', () => {
        const {getByTestId} = render(<Controls
                locked={true}
            />);

        expect(getByTestId('toggle-close')).toBeDisabled()
    });
})
