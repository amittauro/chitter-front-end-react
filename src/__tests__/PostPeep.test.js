import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostPeep from '../PostPeep'
import mockApiData from './mocks/peeps.json'

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

test('when submitting the form asks fetch to post data to api', () => {
  jest.spyOn(window, 'fetch')
  render(<PostPeep />)
  const peep = screen.getByLabelText('Peep:')
  const button = screen.getByRole('button')
  userEvent.type(peep, 'my first peep')
  userEvent.click(button)
  expect(window.fetch).toHaveBeenCalled()
})
