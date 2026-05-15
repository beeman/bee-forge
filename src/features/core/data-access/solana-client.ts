import { createClient } from '@solana/kit'
import { solanaRpcConnection } from '@solana/kit-plugin-rpc'

export function createSolanaClient({ url, urlWs }: { url: string; urlWs?: string }) {
  return createClient().use(
    solanaRpcConnection({
      rpcSubscriptionsUrl: urlWs,
      rpcUrl: url,
    }),
  )
}
