module.exports = {
  preset: 'jest-expo',
  passWithNoTests: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/app/**',
    '!src/shared/constants/**',
  ],
  // Force axios to use the http adapter (which works in Node/Jest) instead of
  // the fetch adapter that crashes with Expo's polyfilled ReadableStream
  moduleNameMapper: {
    '^axios/lib/adapters/fetch$': '<rootDir>/jest.axiosFetchStub.js',
  },
};
