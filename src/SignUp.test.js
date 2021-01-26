import { render, screen, waitFor } from '@testing-library/react';
import SignUp from './SignUp';

test('renders form for signing up', () => {
  render(<SignUp />);
  const username = screen.getByLabelText('Username:');
  const password = screen.getByLabelText('Password:');
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
})
