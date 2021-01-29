// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// require('jest-localstorage-mock');
import '@testing-library/jest-dom'

const sessionStorageMock = {
  getItem: () => { 'sessionData' },
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.sessionStorage = sessionStorageMock
