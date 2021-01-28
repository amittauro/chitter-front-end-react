import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders form for signing up', () => {
  render(<App />)
  const element = screen.getByText(/Sign Up/)
  expect(element).toBeInTheDocument()
})
