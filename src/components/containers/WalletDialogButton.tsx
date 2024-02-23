import { ReactNode } from "react";

import { CSSProperties } from "@mui/styled-engine";
import { Stack } from "@mui/system";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button, ButtonProps, Typography } from "@mui/material";
import { useWalletModal } from "../wallet";

export function WalletDialogButton({ ...props }: ButtonProps) {
    const { connecting } = useWallet();
    const onClick = useWalletConnect();

    return (
        <Button onClick={onClick} sx={{ width: "fit-content", ...props.sx }} {...props}>
            {connecting ? "Connecting" : "Connect"}
        </Button>
    );
}

interface WalletConnectProps {
    color?: string;
    variant?: string;
    sx?: CSSProperties;
    children?: ReactNode;
}
export function WalletConnectText({ color, sx, variant, children }: WalletConnectProps) {
    const { connecting } = useWallet();

    return (
        <Stack tabIndex={0}>
            <Typography
                sx={{ cursor: "pointer", "&:focus": { color: "red" }, ...sx } as any}
                color={color}
            >
                {children}
                {connecting ? "Connecting" : "Connect"}
            </Typography>
        </Stack>
    );
}

export function useWalletConnect() {
    const { setVisible } = useWalletModal();
    const { connect, wallet, disconnect } = useWallet();

    return async function () {
        if (!wallet) {
            setVisible(true);
        } else {
            connect().catch((e) => {
                disconnect();
                // eslint-disable-next-line no-console
                console.log("wallet error", e);

                // Silently catch because any errors are caught by the context `onError` handler
            });
        }
    };
}
