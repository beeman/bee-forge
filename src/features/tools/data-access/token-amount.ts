import { decimalFixedPoint } from '@solana/kit'

export const DEFAULT_TOKEN_DECIMALS = '9'
export const DEFAULT_TOKEN_SUPPLY = '1000'

export function tokenAmountToRawAmount(value: string, decimals: number) {
  return decimalFixedPoint('unsigned', 64, decimals)(value).raw
}

export function validateTokenDecimals(value: string) {
  const decimals = Number(value)

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 9) {
    return 'Decimals must be a whole number from 0 to 9.'
  }

  return undefined
}

export function validateTokenSupply(value: string, decimals: number) {
  try {
    const rawAmount = tokenAmountToRawAmount(value, decimals)

    if (rawAmount < 0n) {
      return 'Supply must be at least 0.'
    }
  } catch {
    return 'Enter a valid token supply.'
  }

  return undefined
}
