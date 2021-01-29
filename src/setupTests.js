import '@testing-library/jest-dom'

const sessionStorageMock = {
  getItem: () => { 'sessionData' },
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.sessionStorage = sessionStorageMock
