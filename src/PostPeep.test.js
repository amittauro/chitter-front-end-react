import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostPeep from './PostPeep';

test('renders form for posting peep', () => {
  render(<PostPeep />);
  const peep = screen.getByLabelText('Peep:');
  expect(peep).toBeInTheDocument();
})

test('can fill in the form', () => {
  render(<PostPeep />);
  const peep = screen.getByLabelText('Peep:');
  userEvent.type(peep, 'my first peep')
  expect(peep).toHaveValue('my first peep')
})
