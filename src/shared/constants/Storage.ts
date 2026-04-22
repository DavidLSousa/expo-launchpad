const PREFIX = '@template';

export const STORAGE_KEYS = {
  // Auth (SecureStore)
  ACCESS_TOKEN: `${PREFIX}.access_token`,
  REFRESH_TOKEN: `${PREFIX}.refresh_token`,

  // User
  USER: `${PREFIX}.user`,

  // Preferences (AsyncStorage)
  APP_THEME: `${PREFIX}.APP_THEME`,
  APP_LOCALE: `${PREFIX}.APP_LOCALE`,

  // Cache
  QUERY_CACHE: `${PREFIX}.query_cache`,
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
