import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Peep from '../Peep'

test('renders a Peep with a like button and peep body', () => {
  render(<Peep id="1" userId="2" body="my first peep" />)
  const like = screen.getByText('like')
  const element = screen.getByText('my first peep')
  expect(like).toBeInTheDocument()
  expect(element).toBeInTheDocument()
})

test('sends api request to like peep', () => {
  jest.spyOn(window, 'fetch')
  render(<Peep id="1" userId="2" body="my first peep" />)
  const like = screen.getByText('like')
  userEvent.click(like)
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', 'Token token=a_valid_session_key')
  expect(window.fetch).toHaveBeenCalled()
})
