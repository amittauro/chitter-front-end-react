import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Peep from '../Peep'

test('renders a Peep with a like button and peep body', () => {
  render(<Peep id="1" userId="2" body="my first peep" likes={2} />)
  const like = screen.getByText('like')
  const element = screen.getByText('my first peep')
  expect(like).toBeInTheDocument()
  expect(element).toBeInTheDocument()
})

test('sends api request to like peep', () => {
  jest.spyOn(window, 'fetch')
  jest.spyOn(global.sessionStorage, 'getItem').mockReturnValueOnce('sessionId').mockReturnValueOnce('sessionKey')
  render(<Peep id="peepId" userId="2" body="my first peep" likes={2} />)
  userEvent.click(screen.getByText('like'))
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/peeps/peepId/likes/sessionId', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=sessionKey'
    }
  })
})
