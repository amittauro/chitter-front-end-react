import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from '../SignIn'
import mockSessionsData from './mocks/sessions.json'
const error = 'error'

test('renders form for signing in', () => {
  render(<SignIn />)
  const username = screen.getByLabelText('Username:')
  const password = screen.getByLabelText('Password:')
  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
})

test('can fill in the form', () => {
  render(<SignIn />)
  const username = screen.getByLabelText('Username:')
  const password = screen.getByLabelText('Password:')
  userEvent.type(username, 'user')
  userEvent.type(password, 'password')
  expect(username).toHaveValue('user')
  expect(password).toHaveValue('password')
})

test('when submitting the form asks fetch to post data to api and returns response', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockSessionsData)
    })
  })
  render(<SignIn />)
  userEvent.type(screen.getByLabelText('Username:'), 'user1')
  userEvent.type(screen.getByLabelText('Password:'), 'password1')
  userEvent.click(screen.getByRole('button'))
  const body = { session: { handle: 'user1', password: 'password1' } }
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const element = await waitFor(() => screen.getByText(/Thanks for signing in/))
  expect(element).toBeInTheDocument()
})

test('when promise is rejected for fetch request', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.reject(error)
  })
  render(<SignIn />)
  userEvent.type(screen.getByLabelText('Username:'), 'user1')
  userEvent.type(screen.getByLabelText('Password:'), 'password1')
  userEvent.click(screen.getByRole('button'))
  const element = await waitFor(() => screen.getByText(/details are not valid/))
  expect(element).toBeInTheDocument()
})
