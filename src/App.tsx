import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import Transaction from "./transaction";
import Cors from "./Cors";

export default function App() {
  const endpoint = "https://mainnet.helius-rpc.com/?api-key=744a6f96-b4b4-4223-96d9-2c0b5f1c26ec";
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Cors /> {/* Cors component handling iframe communication */}
            <WalletMultiButton />
          </div>
          <Transaction />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
