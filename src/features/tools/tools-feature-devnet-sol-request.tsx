import { type Address, lamports } from '@solana/kit'

import { formatSol } from '@/features/tools/data-access/sol-amount'
import { useDevnetSolAirdropMutation } from '@/features/tools/data-access/use-devnet-sol-airdrop-mutation'
import { useDevnetSolBalanceQuery } from '@/features/tools/data-access/use-devnet-sol-balance-query'
import { ToolsUiDevnetSolBalance } from '@/features/tools/ui/tools-ui-devnet-sol-balance'
import { ToolsUiDevnetSolRequestCard } from '@/features/tools/ui/tools-ui-devnet-sol-request-card'
import { ToolsUiDevnetSolRequestForm } from '@/features/tools/ui/tools-ui-devnet-sol-request-form'

export function ToolsFeatureDevnetSolRequest({ address }: { address: Address }) {
  const balance = useDevnetSolBalanceQuery({ address })
  const requestAirdrop = useDevnetSolAirdropMutation({ address })
  const errorMessage = requestAirdrop.error instanceof Error ? requestAirdrop.error.message : undefined

  return (
    <ToolsUiDevnetSolRequestCard description="Airdrops are sent to the currently connected wallet.">
      <ToolsUiDevnetSolBalance
        balanceLabel={balance.isLoading ? 'Loading...' : `${formatSol(balance.data?.value ?? lamports(0n))} SOL`}
      />
      <ToolsUiDevnetSolRequestForm
        errorMessage={errorMessage}
        isRequesting={requestAirdrop.isPending}
        requestDevnetSol={requestAirdrop.mutate}
        resetRequestError={requestAirdrop.reset}
      />
    </ToolsUiDevnetSolRequestCard>
  )
}
