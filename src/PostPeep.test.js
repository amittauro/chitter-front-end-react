import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostPeep from './PostPeep';

test('renders form for posting peep', () => {
  render(<PostPeep />);
  const peep = screen.getByLabelText('Peep:');
  expect(peep).toBeInTheDocument();
})
