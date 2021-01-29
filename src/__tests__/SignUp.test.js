import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUp from '../SignUp'
let data

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

test('wheb submitting the form asks fetch to post data to api', () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(data)
    })
  })
  render(<SignUp />)
  const username = screen.getByLabelText('Username:')
  const password = screen.getByLabelText('Password:')
  const button = screen.getByRole('button')
  userEvent.type(username, 'user1')
  userEvent.type(password, 'password1')
  userEvent.click(button)
  const body = {user: {handle:"user1", password:"password1"}}
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
})
