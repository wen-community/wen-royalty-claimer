/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useMemo } from "react";

import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";

export interface WalletModalContextState {
    visible: boolean;
    setVisible: (open: boolean) => void;
}

const DEFAULT_CONTEXT = {
    setVisible(_open: boolean) {
        console.error(constructMissingProviderErrorMessage("call", "setVisible"));
    },
    visible: false
};
Object.defineProperty(DEFAULT_CONTEXT, "visible", {
    get() {
        console.error(constructMissingProviderErrorMessage("read", "visible"));
        return false;
    }
});

function constructMissingProviderErrorMessage(action: string, valueName: string) {
    return (
        "You have tried to " +
        ` ${action} "${valueName}"` +
        " on a WalletModalContext without providing one." +
        " Make sure to render a WalletModalProvider" +
        " as an ancestor of the component that uses " +
        "WalletModalContext"
    );
}

export const WalletModalContext = createContext<WalletModalContextState>(DEFAULT_CONTEXT as WalletModalContextState);

export function useWalletModal(): WalletModalContextState {
    return useContext(WalletModalContext);
}

// utils copied from https://github.com/solana-labs/wallet-adapter/blob/master/packages/ui/react-ui/src/WalletModal.tsx
export function useModalUtils() {
    const { wallets } = useWallet();

    const [installedWallets, otherWallets] = useMemo(() => {
        const installed: Wallet[] = [];
        const notDetected: Wallet[] = [];
        const loadable: Wallet[] = [];

        for (const wallet of wallets) {
            // hardcode wallets here to prevent user installed wallets
            const supportedWallets = ["Backpack", "Phantom", "Solflare"];
            const isSupported = supportedWallets.includes(wallet.adapter.name);

            if (wallet.readyState === WalletReadyState.NotDetected) {
                notDetected.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Loadable) {
                loadable.push(wallet);
            } else if (isSupported && wallet.readyState === WalletReadyState.Installed) {
                installed.push(wallet);
            }
        }

        return [installed, [...loadable, ...notDetected]];
    }, [wallets]);

    return { installedWallets, otherWallets };
}
