import React, { memo, useMemo } from "react";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
    SolanaMobileWalletAdapter,
    createDefaultAddressSelector,
    createDefaultAuthorizationResultCache
} from "@solana-mobile/wallet-adapter-mobile";
import { FOUNDATION_LOGO, RPC_URL } from "../constants";
import { WalletModalProvider } from "./wallet";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

function AppWalletProvider(props: { children: React.ReactNode }) {
    const endpoint = RPC_URL;

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolanaMobileWalletAdapter({
                addressSelector: createDefaultAddressSelector(),
                appIdentity: {
                    icon: FOUNDATION_LOGO,
                    name: "WNS Royalty",
                    uri: window.location.href
                },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                chain: "mainnet-beta",
                onWalletNotFound: async () => {
                    // no use
                }
            })
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{props.children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default memo(AppWalletProvider);
