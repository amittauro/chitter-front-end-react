import { render, screen, waitFor } from '@testing-library/react'
import Peeps from './peeps'
import mockApiData from './mocks/peeps.json'

test('renders peeps from api', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps />)
  const element = await waitFor(() => screen.getByText('my first peep :)'))
  expect(element).toBeInTheDocument()
})

test('makes fetch request to right api', () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps />)
  expect(window.fetch).toHaveBeenCalledWith('https://chitter-backend-api-v2.herokuapp.com/peeps')
})
