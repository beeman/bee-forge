import { useMobileWallet } from '@wallet-ui/react-native-kit'

import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'
import { useWalletActions } from '@/features/wallet/data-access/use-wallet-actions'
import { useWalletBalanceQuery } from '@/features/wallet/data-access/use-wallet-balance-query'
import { WalletUiCardActions } from '@/features/wallet/ui/wallet-ui-card-actions'
import { WalletUiCardStatus } from '@/features/wallet/ui/wallet-ui-card-status'

const LAMPORTS_PER_SOL = 1_000_000_000

export function WalletFeatureIndex() {
  const { account, chain } = useMobileWallet()
  const actions = useWalletActions({ account })
  const balance = useWalletBalanceQuery({ address: account?.address })
  const accountAddress = account?.address.toString()
  const balanceLabel = balance.isLoading ? 'Loading...' : `${Number(balance.data?.value ?? 0n) / LAMPORTS_PER_SOL} SOL`

  return (
    <ShellUiPage safeArea>
      <ShellUiPageHeader
        description="Connect a Solana wallet, inspect the active account, and try common Mobile Wallet Adapter flows."
        title="Wallet"
      />
      <WalletUiCardStatus
        accountAddress={accountAddress}
        accountLabel={account?.label ?? 'Wallet'}
        balanceLabel={balanceLabel}
        chain={chain}
        transactionSignature={actions.transactionSignature}
      />
      <WalletUiCardActions
        connect={actions.connect}
        disconnect={actions.disconnect}
        hasAccount={!!account}
        isConnecting={actions.isConnecting}
        isDisconnecting={actions.isDisconnecting}
        isSendingTransaction={actions.isSendingTransaction}
        isSigningIn={actions.isSigningIn}
        isSigningMessage={actions.isSigningMessage}
        sendMemoTransaction={actions.sendMemoTransaction}
        signIn={actions.signIn}
        signMessage={actions.signMessage}
      />
    </ShellUiPage>
  )
}
