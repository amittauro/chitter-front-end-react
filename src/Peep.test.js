import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Peep from './Peep'

test('renders a Peep with a like button and peep body', () => {
  render(<Peep id="1" userId="2" sessionId="3" sessionKey="a_valid_session_key" body="my first peep" />)
  const like = screen.getByText('like')
  const element = screen.getByText('my first peep')
  expect(like).toBeInTheDocument()
  expect(element).toBeInTheDocument()
})

test('sends api request to like peep', () => {
  jest.spyOn(window, 'fetch')
  render(<Peep id="1" userId="2" sessionId="3" sessionKey="a_valid_session_key" body="my first peep" />)
  const like = screen.getByText('like')
  userEvent.click(like)
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', 'Token token=a_valid_session_key')
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/peeps/1/likes/3', {
    method: 'PUT',
    headers: myHeaders
  })
})
