import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockApiData from './mocks/peeps.json'
import App from '../App.js'

test('renders routes', () => {
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<App />)
  const element = screen.getByText(/Sign Up/)
  expect(element).toBeInTheDocument()
})
