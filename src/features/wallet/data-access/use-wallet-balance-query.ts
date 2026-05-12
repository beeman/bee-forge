import { Address } from '@solana/kit'
import { useQuery } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-kit'

export function useWalletBalanceQuery({ address }: { address?: Address }) {
  const { chain, client } = useMobileWallet()

  return useQuery({
    enabled: !!address,
    queryFn: () => client.rpc.getBalance(address!).send(),
    queryKey: ['wallet-balance', chain, address],
  })
}
