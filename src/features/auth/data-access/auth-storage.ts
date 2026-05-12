import AsyncStorage from '@react-native-async-storage/async-storage'

export const AUTH_STORAGE_KEY = 'bee-forge.authenticated'

export type AuthStorageSession = {
  address: string
  signature: string
  signedMessage: string
}

export async function authStorageAuthenticated() {
  try {
    const authState = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
    if (!authState) {
      return false
    }

    const session = JSON.parse(authState) as unknown
    return isAuthStorageSession(session)
  } catch (error) {
    console.error('Failed to read auth state.', error)
    return false
  }
}

export async function authStorageSignIn(session: AuthStorageSession) {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  } catch (error) {
    console.error('Failed to persist auth state.', error)
    throw error
  }
}

export async function authStorageSignOut() {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear auth state.', error)
    throw error
  }
}

function isAuthStorageSession(value: unknown): value is AuthStorageSession {
  if (!value || typeof value !== 'object') {
    return false
  }

  const session = value as Record<string, unknown>

  return (
    typeof session.address === 'string' &&
    typeof session.signature === 'string' &&
    typeof session.signedMessage === 'string'
  )
}
