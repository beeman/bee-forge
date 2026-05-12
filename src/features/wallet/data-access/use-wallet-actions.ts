import { getAddMemoInstruction } from '@solana-program/memo'
import { useMutation } from '@tanstack/react-query'
import { Account, useMobileWallet } from '@wallet-ui/react-native-kit'
import { useToast } from 'heroui-native'

export function useWalletActions({ account }: { account?: Account }) {
  const { chain, connect, disconnect, identity, sendTransactions, signIn, signMessages } = useMobileWallet()
  const { toast } = useToast()

  const connectMutation = useMutation({
    mutationFn: connect,
    onError: () =>
      toast.show({
        description: 'Open a Solana wallet and approve the connection.',
        label: 'Connect failed',
        variant: 'danger',
      }),
  })

  const disconnectMutation = useMutation({
    mutationFn: disconnect,
    onError: () =>
      toast.show({
        description: 'The wallet session could not be disconnected.',
        label: 'Disconnect failed',
        variant: 'danger',
      }),
  })

  const sendMemoTransactionMutation = useMutation({
    mutationFn: () => {
      if (!account) {
        throw new Error('Connect a wallet before sending a transaction.')
      }

      return sendTransactions([
        getAddMemoInstruction({
          memo: `gm from Mobile Wallet Adapter - ${account.address}`,
        }),
      ])
    },
    onError: () =>
      toast.show({
        description: 'Approve the memo transaction from your wallet to continue.',
        label: 'Transaction failed',
        variant: 'danger',
      }),
    onSuccess: () =>
      toast.show({
        description: 'The memo transaction was sent.',
        label: 'Transaction sent',
        variant: 'success',
      }),
  })

  const signInMutation = useMutation({
    mutationFn: () =>
      signIn({
        address: account?.address.toString(),
        chainId: chain,
        uri: identity.uri,
      }),
    onError: () =>
      toast.show({
        description: 'Sign the Solana message with your wallet to continue.',
        label: 'Sign in failed',
        variant: 'danger',
      }),
    onSuccess: () =>
      toast.show({
        description: 'The sign-in message was approved.',
        label: 'Signed in',
        variant: 'success',
      }),
  })

  const signMessageMutation = useMutation({
    mutationFn: () => {
      if (!account) {
        throw new Error('Connect a wallet before signing a message.')
      }

      return signMessages(new TextEncoder().encode(`Signing a message with ${account.address}`))
    },
    onError: () =>
      toast.show({
        description: 'Approve the message signature from your wallet to continue.',
        label: 'Message failed',
        variant: 'danger',
      }),
    onSuccess: () =>
      toast.show({
        description: 'The wallet signed the message.',
        label: 'Message signed',
        variant: 'success',
      }),
  })

  return {
    connect: () => connectMutation.mutate(),
    disconnect: () => disconnectMutation.mutate(),
    isConnecting: connectMutation.isPending,
    isDisconnecting: disconnectMutation.isPending,
    isSendingTransaction: sendMemoTransactionMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isSigningMessage: signMessageMutation.isPending,
    sendMemoTransaction: () => sendMemoTransactionMutation.mutate(),
    signIn: () => signInMutation.mutate(),
    signMessage: () => signMessageMutation.mutate(),
    transactionSignature: sendMemoTransactionMutation.data,
  }
}
