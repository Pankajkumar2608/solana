import { useEffect } from "react";

const Cors: React.FC = () => {
  useEffect(() => {
    // Send a message to the parent window requesting wallet connection
    window.parent.postMessage({ type: 'request_wallet_connection' }, '*');

    // Listen for messages from the parent window
    const messageListener = (event: MessageEvent) => {
      // Ensure the message comes from the trusted parent site
      if (event.origin !== 'https://your-parent-site.com') {
        console.warn('Untrusted message origin:', event.origin);
        return;
      }

      // Check if the wallet has been connected
      if (event.data.type === 'wallet_connected') {
        const publicKey = event.data.publicKey;
        const connectionURL = event.data.connectionURL;

        console.log('Wallet connected with public key:', publicKey);
        console.log('Connected URL:', connectionURL);

        // Update your widget UI to reflect the wallet connection and URL
        const walletStatus = document.getElementById('wallet-status');
        const connectionUrlElement = document.getElementById('connection-url');
        if (walletStatus && connectionUrlElement) {
          walletStatus.innerText = `Wallet connected: ${publicKey}`;
          connectionUrlElement.innerText = `Connected to: ${connectionURL}`;
        }
      }
    };

    window.addEventListener('message', messageListener);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  return (
    <div>
      <h2>Wallet Connection Status</h2>
      <div id="wallet-status">No wallet connected.</div>
      <div id="connection-url">No URL connected.</div>
    </div>
  );
};

export default Cors;
