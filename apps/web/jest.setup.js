import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for components using scroll animations
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }]);
  }
  unobserve() {}
  disconnect() {}
}

if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  window.IntersectionObserver = IntersectionObserverMock;
}

if (typeof global !== 'undefined' && !global.IntersectionObserver) {
  global.IntersectionObserver = IntersectionObserverMock;
}

// Polyfill matchMedia for components that check reduced motion
const matchMediaMock = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = matchMediaMock;
}

if (typeof global !== 'undefined' && !global.matchMedia) {
  global.matchMedia = matchMediaMock;
}

