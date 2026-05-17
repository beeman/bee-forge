import { getCreateAccountInstruction } from '@solana-program/system'
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenIdempotentInstruction,
  getInitializeMintInstruction as getInitializeTokenMintInstruction,
  getMintSize as getTokenMintSize,
  getMintToInstruction as getTokenMintToInstruction,
} from '@solana-program/token'
import {
  getInitializeMintInstruction as getInitializeToken2022MintInstruction,
  getMintSize as getToken2022MintSize,
  getMintToInstruction as getToken2022MintToInstruction,
} from '@solana-program/token-2022'
import {
  type Address,
  appendTransactionMessageInstructions,
  createTransactionMessage,
  generateKeyPairSigner,
  getBase58Decoder,
  type Instruction,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
  type Signature,
  type TransactionSigner,
} from '@solana/kit'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { useToast } from 'heroui-native'

import { tokenAmountToRawAmount } from '@/features/tools/data-access/token-amount'
import { isToken2022Program } from '@/features/tools/data-access/token-mint-program'

const base58Decoder = getBase58Decoder()

export interface TokenMintCreateInput {
  decimals: number
  supply: string
  tokenProgram: Address
}

export interface TokenMintCreateResult {
  ata?: Address
  mint: Address
  signature: Signature
  tokenProgram: Address
}

export function useTokenMintCreateMutation({ address }: { address: Address }) {
  const { client, getTransactionSigner } = useMobileWallet()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ decimals, supply, tokenProgram }: TokenMintCreateInput): Promise<TokenMintCreateResult> => {
      const {
        context: { slot: minContextSlot },
        value: latestBlockhash,
      } = await client.rpc.getLatestBlockhash().send()
      const mint = await generateKeyPairSigner()
      const mintSize = getMintSize(tokenProgram)
      const rent = await client.rpc.getMinimumBalanceForRentExemption(BigInt(mintSize)).send()
      const transactionSigner = getTransactionSigner(address, minContextSlot)
      const rawSupply = tokenAmountToRawAmount(supply, decimals)
      const instructions: Instruction[] = [
        getCreateAccountInstruction({
          lamports: rent,
          newAccount: mint,
          payer: transactionSigner,
          programAddress: tokenProgram,
          space: BigInt(mintSize),
        }),
        getInitializeMintInstruction({
          decimals,
          mint: mint.address,
          mintAuthority: address,
          tokenProgram,
        }),
      ]
      let ata: Address | undefined

      if (rawSupply > 0n) {
        ;[ata] = await findAssociatedTokenPda({
          mint: mint.address,
          owner: address,
          tokenProgram,
        })
        instructions.push(
          getCreateAssociatedTokenIdempotentInstruction({
            ata,
            mint: mint.address,
            owner: address,
            payer: transactionSigner,
            tokenProgram,
          }),
          getMintToInstruction({
            amount: rawSupply,
            mint: mint.address,
            mintAuthority: transactionSigner,
            token: ata,
            tokenProgram,
          }),
        )
      }

      const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => appendTransactionMessageInstructions(instructions, tx),
        (tx) => setTransactionMessageFeePayerSigner(transactionSigner, tx),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      )
      const signatureBytes = await signAndSendTransactionMessageWithSigners(transactionMessage)

      return {
        ata,
        mint: mint.address,
        signature: base58Decoder.decode(signatureBytes) as Signature,
        tokenProgram,
      }
    },
    onError: () =>
      toast.show({
        description: 'Approve the mint transaction from your wallet and make sure it has devnet SOL.',
        label: 'Token mint failed',
        variant: 'danger',
      }),
    onSuccess: () =>
      toast.show({
        description: 'The token mint transaction was sent.',
        label: 'Token created',
        variant: 'success',
      }),
  })
}

function getInitializeMintInstruction({
  decimals,
  mint,
  mintAuthority,
  tokenProgram,
}: {
  decimals: number
  mint: Address
  mintAuthority: Address
  tokenProgram: Address
}) {
  if (isToken2022Program(tokenProgram)) {
    return getInitializeToken2022MintInstruction({
      decimals,
      mint,
      mintAuthority,
    })
  }

  return getInitializeTokenMintInstruction({
    decimals,
    mint,
    mintAuthority,
  })
}

function getMintSize(tokenProgram: Address) {
  return isToken2022Program(tokenProgram) ? getToken2022MintSize() : getTokenMintSize()
}

function getMintToInstruction({
  amount,
  mint,
  mintAuthority,
  token,
  tokenProgram,
}: {
  amount: bigint
  mint: Address
  mintAuthority: TransactionSigner
  token: Address
  tokenProgram: Address
}) {
  if (isToken2022Program(tokenProgram)) {
    return getToken2022MintToInstruction({
      amount,
      mint,
      mintAuthority,
      token,
    })
  }

  return getTokenMintToInstruction({
    amount,
    mint,
    mintAuthority,
    token,
  })
}
