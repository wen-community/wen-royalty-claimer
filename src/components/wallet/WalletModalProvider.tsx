import { ReactNode, useState } from "react";

import { Dialog } from "@mui/material";

import { WalletModalContext } from "./useWalletModal";
import WalletModal from "./WalletModal";

export default function WalletModalProvider({ children }: { children: ReactNode; ledgerAllowed?: boolean }) {
    const [visible, setVisible] = useState(false);

    return (
        <WalletModalContext.Provider
            value={{
                visible,
                setVisible
            }}
        >
            {children}

            <Dialog onClose={() => setVisible(false)} open={visible}>
                <WalletModal />
            </Dialog>
        </WalletModalContext.Provider>
    );
}
