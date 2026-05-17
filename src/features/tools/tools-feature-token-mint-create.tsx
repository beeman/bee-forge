import { Address } from '@solana/kit'

import { useTokenMintCreateMutation } from '@/features/tools/data-access/use-token-mint-create-mutation'
import { ToolsUiTokenMintForm } from '@/features/tools/ui/tools-ui-token-mint-form'
import { ToolsUiTokenMintRequestCard } from '@/features/tools/ui/tools-ui-token-mint-request-card'
import { ToolsUiTokenMintResult } from '@/features/tools/ui/tools-ui-token-mint-result'

export function ToolsFeatureTokenMintCreate({ address }: { address: Address }) {
  const createTokenMint = useTokenMintCreateMutation({ address })

  return (
    <ToolsUiTokenMintRequestCard>
      {createTokenMint.data ? <ToolsUiTokenMintResult result={createTokenMint.data} /> : null}
      <ToolsUiTokenMintForm
        createTokenMint={createTokenMint.mutate}
        errorMessage={createTokenMint.error instanceof Error ? createTokenMint.error.message : undefined}
        isCreating={createTokenMint.isPending}
        resetCreateError={createTokenMint.reset}
      />
    </ToolsUiTokenMintRequestCard>
  )
}
