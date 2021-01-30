import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostPeep from '../PostPeep'
const data = { body: 'my first peep' }
const error = 'error'

beforeEach(() => {
  jest.clearAllMocks()
})

test('renders form for posting peep', () => {
  render(<PostPeep />)
  const peep = screen.getByLabelText('Peep:')
  expect(peep).toBeInTheDocument()
})

test('can fill in the form', () => {
  render(<PostPeep />)
  const peep = screen.getByLabelText('Peep:')
  userEvent.type(peep, 'my first peep')
  expect(peep).toHaveValue('my first peep')
})

test('when submitting the form asks fetch to post data to api', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(data)
    })
  })
  jest.spyOn(global.sessionStorage, 'getItem').mockReturnValueOnce('sessionId').mockReturnValueOnce('sessionKey')
  render(<PostPeep />)
  userEvent.type(screen.getByLabelText('Peep:'), 'my first peep')
  userEvent.click(screen.getByRole('button'))
  const body = { peep: { user_id: 'sessionId', body: 'my first peep' } }
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/peeps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=sessionKey'
    },
    body: JSON.stringify(body)
  })
  const element = await waitFor(() => screen.getByText(/Thanks for posting: my first peep/))
  expect(element).toBeInTheDocument()
})

test('when promise is rejected for fetch request', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.reject(error)
  })
  render(<PostPeep />)
  userEvent.type(screen.getByLabelText('Peep:'), 'my first peep')
  userEvent.click(screen.getByRole('button'))
  const element = await waitFor(() => screen.getByText(/Unable to post peep/))
  expect(element).toBeInTheDocument()
})
