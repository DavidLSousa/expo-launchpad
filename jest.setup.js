/* global jest */

// Fix for axios 1.7+ + jest-expo compatibility issue.
// Expo polyfills ReadableStream from virtual/streams.js which has a bug:
// calling body.cancel() on a ReadableStream that already has a reader throws.
// We override ReadableStream globally BEFORE any module is loaded.
class SafeReadableStream {
  constructor(underlyingSource, strategy) {
    this._locked = false;
  }
  get locked() {
    return this._locked;
  }
  getReader() {
    this._locked = true;
    return {
      read: () => Promise.resolve({ done: true, value: undefined }),
      releaseLock: () => {
        this._locked = false;
      },
      cancel: () => Promise.resolve(),
      closed: Promise.resolve(undefined),
    };
  }
  cancel() {
    return Promise.resolve();
  }
  pipeTo() {}
  pipeThrough() {
    return this;
  }
  tee() {
    return [new SafeReadableStream(), new SafeReadableStream()];
  }
  [Symbol.asyncIterator]() {
    return { next: async () => ({ done: true, value: undefined }) };
  }
}

global.ReadableStream = SafeReadableStream;

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Simulação de SecureStore
// jest.mock('expo-secure-store', () => ({
//   getItemAsync: jest.fn(() => Promise.resolve('mock-token')),
//   setItemAsync: jest.fn(() => Promise.resolve()),
//   deleteItemAsync: jest.fn(() => Promise.resolve()),
// }));
// Simulação de SecureStore Dinâmica
const mockSecureStore = {};
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn((key) => Promise.resolve(mockSecureStore[key] || null)),
  setItemAsync: jest.fn((key, value) => {
    mockSecureStore[key] = value;
    return Promise.resolve();
  }),
  deleteItemAsync: jest.fn((key) => {
    delete mockSecureStore[key];
    return Promise.resolve();
  }),
}));

// Simulação de NetInfo (Rede Offline/Online)
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

// Simulação de Navegação Essencial do Expo Router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    dismissAll: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  useSegments: () => ['(tabs)'],
  Link: 'Link',
}));

// Simulação do React Native Safe Area
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
}));

// Simulação para suprimir warning no use do Lucide React Native (React 19 SVGs)
jest.mock('lucide-react-native', () => ({
  WifiOff: 'WifiOff',
  AlertTriangle: 'AlertTriangle',
  CheckCircle: 'CheckCircle',
}));

// Simulação de Criptografia (expo-crypto)
jest.mock('expo-crypto', () => ({
  digestStringAsync: jest.fn(() => Promise.resolve('mocked-digest-hex')),
  getRandomBytesAsync: jest.fn((size) => {
    return Promise.resolve(new Uint8Array(size).fill(0));
  }),
  CryptoDigestAlgorithm: {
    SHA256: 'SHA256',
  },
  CryptoEncoding: {
    HEX: 'HEX',
  },
}));

// Simulação de AES (react-native-aes-crypto)
jest.mock('react-native-aes-crypto', () => ({
  encrypt: jest.fn(() => Promise.resolve('mocked-cipher-base64')),
  decrypt: jest.fn(() => Promise.resolve('mocked-plain-text')),
}));

// Simulação de Fetch Global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
);
