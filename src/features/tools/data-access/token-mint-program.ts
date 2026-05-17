import { TOKEN_PROGRAM_ADDRESS } from '@solana-program/token'
import { TOKEN_2022_PROGRAM_ADDRESS } from '@solana-program/token-2022'
import { type Address } from '@solana/kit'

export const DEFAULT_TOKEN_MINT_PROGRAM = TOKEN_PROGRAM_ADDRESS

export const TOKEN_MINT_PROGRAMS = [
  {
    address: TOKEN_PROGRAM_ADDRESS,
    label: 'SPL Token',
  },
  {
    address: TOKEN_2022_PROGRAM_ADDRESS,
    label: 'Token-2022',
  },
] satisfies { address: Address; label: string }[]

export function getTokenMintProgramLabel(tokenProgram: Address) {
  return TOKEN_MINT_PROGRAMS.find((program) => program.address === tokenProgram)?.label ?? 'Custom token program'
}

export function isToken2022Program(tokenProgram: Address) {
  return tokenProgram === TOKEN_2022_PROGRAM_ADDRESS
}
