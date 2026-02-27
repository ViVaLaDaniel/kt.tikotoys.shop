module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/fileMock.js',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', {
      useESM: true,
      diagnostics: {
        ignoreCodes: [1343]
      },
      astTransformers: {
        before: [
          {
            path: 'ts-jest-mock-import-meta',
            options: { metaObjectReplacement: { env: { VITE_FIREBASE_API_KEY: 'test-key' } } }
          }
        ]
      }
    }]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@firebase|firebase|@firebase/util)/)"
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['src/components/Header.test.tsx']
};