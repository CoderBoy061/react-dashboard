import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill for scrollIntoView in jsdom
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Silence React 19 act warnings for Chart.js animations in tests
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Polyfill TextEncoder/TextDecoder required by react-router
if (!global.TextEncoder) {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Polyfill matchMedia for antd responsive utilities
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
