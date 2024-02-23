import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material/";
import { Stack, Typography } from "@mui/material";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";

import { useModalUtils, useWalletModal } from "./useWalletModal";
import { BACKGROUND_COLOR } from "../theme";

// adapted from https://github.com/solana-labs/wallet-adapter
export default function WalletModal() {
    const { otherWallets, installedWallets } = useModalUtils();

    const noWalletsInstalled = installedWallets.length === 0;
    const [isExpanded, setIsExpanded] = useState<boolean>(noWalletsInstalled);

    return (
        <Stack sx={{ width: "calc(100vw - 70px)", maxWidth: "350px", overflowX: "hidden", backgroundColor: `${BACKGROUND_COLOR} !important`}}>
            <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ p: "20px" }}>
                <Typography color="primary" sx={{ fontWeight: 800, marginTop: "2px" }}>
                    Wen Foundation
                </Typography>
            </Stack>
            <Stack>
                <Typography sx={{ paddingX: "20px", paddingBottom: "10px" }} color="caption">
                    Select your wallet
                </Typography>
                {installedWallets.map((w) => (
                    <WalletRow wallet={w} key={w.adapter.name} />
                ))}
                {isExpanded && otherWallets.map((w) => <WalletRow wallet={w} key={w.adapter.name} />)}
                {noWalletsInstalled ? (
                    <Stack sx={{ p: "20px" }} />
                ) : otherWallets.length ? (
                    <Stack direction={"row"}
                        justifyContent="space-between"
                        onClick={() => setIsExpanded(!isExpanded)}
                        sx={{ padding: "20px", cursor: "pointer" }}
                    >
                        <Typography color="caption">All options</Typography>
                        <Typography color="caption">{isExpanded ? <ExpandLess /> : <ExpandMore />}</Typography>
                    </Stack>
                ) : (
                    <Stack sx={{ pb: "10px" }} />
                )}
            </Stack>
        </Stack>
    );
}

function WalletRow({ wallet }: { wallet: Wallet }) {
    const { setVisible } = useWalletModal();
    const { select } = useWallet();
    function handleSelect() {
        select(wallet.adapter.name);
        setVisible(false);
    }

    return (
        <Stack direction={"row"}
            justifyContent="space-between"
            sx={{ cursor: "pointer", px: "20px", py: "10px" }}
            onClick={handleSelect}
        >
            <Stack direction={"row"} spacing={0.5}>
                <img width={"25px"} alt={"logo"} src={wallet.adapter.icon} />
                <Typography variant="h4">{wallet.adapter.name}</Typography>
            </Stack>
            {wallet.readyState === WalletReadyState.Installed && (
                <Typography variant="body2" color="caption">
                    Detected
                </Typography>
            )}
        </Stack>
    );
}
