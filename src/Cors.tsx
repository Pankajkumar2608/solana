import React, { useEffect } from 'react';

// Define the type for the solana object (you can refine this as per the Phantom wallet SDK)
declare global {
  interface Window {
    solana: any; // You can replace `any` with a more specific type if using a Phantom SDK
  }
}

const WalletConnectionComponent: React.FC = () => {
  useEffect(() => {
    const messageListener = async (event: MessageEvent) => {
      // Ensure the message comes from the trusted parent site
      if (event.origin !== 'https://your-parent-site.com') {
        console.warn('Untrusted message origin:', event.origin);
        return;
      }

      // Check if the parent site is requesting a wallet connection
      if (event.data.type === 'request_wallet_connection') {
        console.log('Parent site requested wallet connection');

        try {
          // Simulate wallet connection process (replace with real wallet logic)
          const response = await window.solana.connect();
          const publicKey = response.publicKey.toString();

          // Send wallet connection info back to the parent site
          window.parent.postMessage({ type: 'wallet_connected', publicKey }, '*');
        } catch (err) {
          console.error('Wallet connection failed:', err);
        }
      }
    };

    // Add event listener for receiving messages
    window.addEventListener('message', messageListener);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  return (
    <div>
      {/* Your UI components here */}
      <h2>Wallet Connection Component</h2>
    </div>
  );
};

export default WalletConnectionComponent;
