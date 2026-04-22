import React from 'react';
import { render, fireEvent } from '../../../shared/utils/test-utils';
import { LoginForm } from '../components/LoginForm';

describe('LoginForm (UI Unit Test)', () => {
  it('should render the welcome text', () => {
    const { getByText } = render(<LoginForm onLogin={jest.fn()} />);
    expect(getByText('Bem-vindo')).toBeTruthy();
  });

  it('should call onLogin when button is pressed', () => {
    const onLoginMock = jest.fn();
    const { getByTestId } = render(<LoginForm onLogin={onLoginMock} />);

    const button = getByTestId('login-button');
    fireEvent.press(button);

    expect(onLoginMock).toHaveBeenCalledTimes(1);
  });

  it('should show loading state and disable button', () => {
    const { getByText, getByTestId } = render(<LoginForm onLogin={jest.fn()} isLoading={true} />);

    expect(getByText('Carregando...')).toBeTruthy();
    expect(getByTestId('login-button').props.accessibilityState.disabled).toBe(true);
  });
});
