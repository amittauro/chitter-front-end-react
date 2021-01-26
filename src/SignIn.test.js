import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './SignUp';

test('renders form for signing in', () => {
  render(<SignIn />);
  const username = screen.getByLabelText('Username:');
  const password = screen.getByLabelText('Password:');
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
})

test('can fill in the form', () => {
  render(<SignIn />);
  const username = screen.getByLabelText('Username:');
  const password = screen.getByLabelText('Password:');
  userEvent.type(username, 'user')
  userEvent.type(password, 'password')
  expect(username).toHaveValue('user')
  expect(password).toHaveValue('password')
})
