import { useMutation } from '@tanstack/react-query'
import { fromUint8Array, useMobileWallet } from '@wallet-ui/react-native-kit'
import { useToast } from 'heroui-native'

import { authStorageSignIn } from '@/features/auth/data-access/auth-storage'
import { useAuthStorage } from '@/features/auth/data-access/use-auth-storage'

export function useAuthSignInMutation() {
  const authStorage = useAuthStorage()
  const { account, chain, identity, signIn: signInWithWallet } = useMobileWallet()
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await signInWithWallet({
        address: account?.address.toString(),
        chainId: chain,
        uri: identity.uri,
      })

      await authStorageSignIn({
        address: result.account.address.toString(),
        signature: fromUint8Array(result.signature),
        signedMessage: fromUint8Array(result.signedMessage),
      })
    },
    onSuccess: () => authStorage.signIn(),
  })

  async function signIn() {
    if (mutation.isPending) {
      return
    }

    try {
      await mutation.mutateAsync()
    } catch {
      toast.show({
        description: 'Sign the Solana message with your wallet to continue.',
        label: 'Sign in failed',
        variant: 'danger',
      })
    }
  }

  return {
    isPending: mutation.isPending,
    signIn,
  }
}
