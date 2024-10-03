import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js"

export default function Transaction() {

    const { connection } = useConnection();
    const wallet = useWallet();

    function send() {
        const transaction = new web3.Transaction();
        transaction.add(
            web3.SystemProgram.transfer({
                fromPubkey: wallet.publicKey!,
                toPubkey: new web3.PublicKey("2FPgtgBBUXAUfYoXfMiFiNibxp84FQ2iPchtePeD6fKY"),
                lamports: 1
            }));

        wallet.sendTransaction(transaction, connection);
    }

    return (
        <div id='content'>
            <button type="button" onClick={() => send()}>Send Transaction</button>
        </div>
    );
}