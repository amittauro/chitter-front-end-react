import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from '../SignIn'
import mockSessionsData from './mocks/sessions.json'
import mockApiData from './mocks/peeps.json'

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

test('when submitting the form asks fetch to post data to api', () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<SignIn />)
  const username = screen.getByLabelText('Username:')
  const password = screen.getByLabelText('Password:')
  const button = screen.getByRole('button')
  userEvent.type(username, 'user1')
  userEvent.type(password, 'password1')
  userEvent.click(button)
  expect(window.fetch).toHaveBeenCalled()
})
