import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUp from '../SignUp'
let data
const error = 'error'

beforeEach(() => {
  jest.clearAllMocks()
})

test('renders sign up', () => {
  render(<SignUp />)
  const element = screen.getByText(/Sign Up/)
  expect(element).toBeInTheDocument()
})

test('renders form for signing up', () => {
  render(<SignUp />)
  const username = screen.getByLabelText('Username:')
  const password = screen.getByLabelText('Password:')
  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
})

test('can fill in the form', () => {
  render(<SignUp />)
  const username = screen.getByLabelText('Username:')
  const password = screen.getByLabelText('Password:')
  userEvent.type(username, 'user')
  userEvent.type(password, 'password')
  expect(username).toHaveValue('user')
  expect(password).toHaveValue('password')
})

test('wheb submitting the form asks fetch to post data to api', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(data)
    })
  })
  render(<SignUp />)
  userEvent.type(screen.getByLabelText('Username:'), 'user1')
  userEvent.type(screen.getByLabelText('Password:'), 'password1')
  userEvent.click(screen.getByRole('button'))
  const body = { user: { handle: 'user1', password: 'password1' } }
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const element = await waitFor(() => screen.getByText(/Thanks for signing up/))
  expect(element).toBeInTheDocument()
})

test('handling promise rejections', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.reject(error)
  })
  render(<SignUp />)
  userEvent.type(screen.getByLabelText('Username:'), 'user1')
  userEvent.type(screen.getByLabelText('Password:'), 'password1')
  userEvent.click(screen.getByRole('button'))
  const element = await waitFor(() => screen.getByText(/User already exists/))
  expect(element).toBeInTheDocument()
})
