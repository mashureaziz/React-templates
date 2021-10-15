import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import General from './General';

test('renders click me button' , async() => {
    render(<General/>);

    const clickButton = screen.getByRole('button');

    userEvent.click(clickButton);

    const greeting = screen.queryAllByRole('button');
    expect(greeting).toHaveLength(2);

})