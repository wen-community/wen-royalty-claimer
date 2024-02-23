import { memo } from "react";

import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Button, Stack, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { WalletConnectText, useWalletConnect } from "./WalletDialogButton";

const BUTTON_SX: SxProps<Theme> = {
    py: "0px",
    px: "10px",
    maxHeight: "31px",
    minHeight: "31px",
    borderRadius: "0px",
    border: "none",
    ":hover": {
        border: "none"
    }
};

function abbreviateAddress(address?: string | PublicKey, size = 4) {
    if (!address) return address;
    return address.toString().slice(0, size) + "…" + address.toString().slice(-size);
}

export default memo(function DesktopWallet() {
    const { publicKey, connected, disconnect } = useWallet();

    const isSignedIn = connected && publicKey;
    const pubkey = abbreviateAddress(publicKey?.toString());
    const connect = useWalletConnect();

    return (
        <Stack direction={"row"} spacing={1} sx={{ position: "relative" }}>
            <Stack direction={"row"} sx={{ border: `1px solid`, borderRadius: "5px" }}>
                <Button
                    sx={BUTTON_SX}
                    variant="outlined"
                    onClick={() => {
                        if (!isSignedIn) {
                            connect();
                        } else {
                            disconnect();
                        }
                    }}
                >
                    {!isSignedIn ? (
                        <WalletConnectText />
                    ) : (
                        <Stack direction={"row"} spacing={0.5}>
                            <Typography color="disabled">
                                <AccountBalanceWalletOutlined />
                            </Typography>
                            <Typography variant="h4">{pubkey}</Typography>
                        </Stack>
                    )}
                </Button>
            </Stack>
        </Stack>
    );
});
