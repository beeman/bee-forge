import {
  type Address,
  airdropFactory,
  type GetSignatureStatusesApi,
  type RequestAirdropApi,
  type Rpc,
  type RpcSubscriptions,
  type SignatureNotificationsApi,
} from '@solana/kit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { useToast } from 'heroui-native'

import { solToLamports } from '@/features/tools/data-access/sol-amount'

export function useDevnetSolAirdropMutation({ address }: { address: Address }) {
  const { chain, client } = useMobileWallet()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (amount: string) => {
      const requestAirdrop = airdropFactory(getAirdropClient(client))

      return requestAirdrop({
        commitment: 'confirmed',
        lamports: solToLamports(amount),
        recipientAddress: address,
      })
    },
    onError: () =>
      toast.show({
        description: 'Try again later or use the Solana faucet directly.',
        label: 'Airdrop failed',
        variant: 'danger',
      }),
    onSuccess: (_, amount) => {
      queryClient.invalidateQueries({ queryKey: ['wallet-balance', chain, address] })
      toast.show({
        description: `${amount} SOL was requested for your connected wallet.`,
        label: 'Airdrop requested',
        variant: 'success',
      })
    },
  })
}

function getAirdropClient(client: { rpc: unknown; rpcSubscriptions: unknown }): {
  rpc: Rpc<GetSignatureStatusesApi & RequestAirdropApi>
  rpcSubscriptions: RpcSubscriptions<SignatureNotificationsApi>
} {
  return {
    rpc: client.rpc as Rpc<GetSignatureStatusesApi & RequestAirdropApi>,
    rpcSubscriptions: client.rpcSubscriptions as RpcSubscriptions<SignatureNotificationsApi>,
  }
}
