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
  window.alert = jest.fn()
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
  const body = '{"session": {"handle":"user1", "password":"password1"}}'
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
})

// having to use wrong api because showing peeps testing alert is called?

// test('after signing in shows the peeps', async () => {
//   jest.spyOn(window, 'fetch').mockImplementation(() => {
//     return Promise.resolve({
//       json: () => Promise.resolve(mockApiData)
//     })
//   })
//   render(<SignIn />)
//   const username = screen.getByLabelText('Username:')
//   const password = screen.getByLabelText('Password:')
//   const button = screen.getByRole('button')
//   userEvent.type(username, 'user1')
//   userEvent.type(password, 'password1')
//   userEvent.click(button)
//   const peep = await waitFor(() => screen.getByLabelText('Peep:'))
//   expect(peep).toBeInTheDocument()
//