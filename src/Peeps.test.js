import { render, screen, waitFor } from '@testing-library/react';
import Peeps from './peeps';
import mockApiData from './mocks/peeps.json'

test('renders peeps from api', async () => {
  // we make a call to fetch which returns a promise
  jest.spyOn(window, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockApiData)
    })
  })
  render(<Peeps />);
  const element = await waitFor(() => screen.getByText("my first peep :)"));
  expect(element).toBeInTheDocument();
})
