import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

test("Rendering Button component", () => {
    const handleClick = jest.fn();
    render(<Button handler={handleClick} dataTestid='button'/>); // Передаем обработчик handleClick

    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1); // Убеждаемся, что handleClick был вызван один раз
})
