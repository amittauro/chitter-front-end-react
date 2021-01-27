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

test('when submitting the form asks fetch to post data to api', () => {
  jest.spyOn(window, "fetch")
  render(<PostPeep userId="1" sessionKey="a_valid_session_key" />);
  const peep = screen.getByLabelText('Peep:');
  const button = screen.getByRole("button")
  userEvent.type(peep, 'my first peep')
  userEvent.click(button)
  const body = `{"peep": {"user_id":"1", "body":"my first peep"}}`
  expect(window.fetch).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/peeps", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token="a_valid_session_key"`
    },
    body: body
  })
})
