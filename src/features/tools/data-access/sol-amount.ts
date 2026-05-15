import {
  decimalFixedPointToString,
  solToLamports as kitSolToLamports,
  type Lamports,
  lamportsToSol,
  sol,
} from '@solana/kit'

export const DEFAULT_DEVNET_SOL_AMOUNT = '1.0'

const MAX_DEVNET_SOL_LAMPORTS = kitSolToLamports(sol('2.0'))
const MIN_DEVNET_SOL_LAMPORTS = kitSolToLamports(sol('0.1'))

export function formatSol(value: Lamports) {
  return decimalFixedPointToString(lamportsToSol(value), {
    decimals: 4,
    rounding: 'floor',
  })
}

export function solToLamports(value: string) {
  return kitSolToLamports(sol(value))
}

export function validateDevnetSolAmount(value: string) {
  let lamportsAmount: Lamports

  try {
    lamportsAmount = solToLamports(value)
  } catch {
    return 'Enter a valid SOL amount.'
  }

  if (lamportsAmount < MIN_DEVNET_SOL_LAMPORTS) {
    return 'Amount must be at least 0.1 SOL.'
  }

  if (lamportsAmount > MAX_DEVNET_SOL_LAMPORTS) {
    return 'Amount must be at most 2.0 SOL.'
  }

  return undefined
}
