import { render, screen, waitFor } from '@testing-library/react'
import Peeps from './peeps'
import mockApiData from './mocks/peeps.json'
import userEvent from '@testing-library/user-event'

test('renders peeps from api', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps sessionId="1" sessionKey="1" />)
  const element = await waitFor(() => screen.getByText('my first peep :)'))
  expect(element).toBeInTheDocument()
})

test('makes fetch request to right api', () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps sessionId="1" sessionKey="1" />)
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/peeps')
})

test('can refresh the peeps', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps sessionId="1" sessionKey="1" />)
  const button = await waitFor(() => screen.getByText('Refresh Peeps'))
  userEvent.click(button)
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/peeps')
})

test('renders the post peep', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps sessionId="1" sessionKey="1" />)
  const peep = await waitFor(() => screen.getByLabelText(/Peep:/))
  expect(peep).toBeInTheDocument()
})
