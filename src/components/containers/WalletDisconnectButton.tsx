import LinkOffIcon from "@mui/icons-material/LinkOff";
import { Button, ButtonProps } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletDisconnectButton(props: ButtonProps) {
    const { disconnect } = useWallet();

    return (
        <Button onClick={disconnect} {...props}>
            <LinkOffIcon sx={{ marginRight: "5px" }} fontSize="inherit" />
            Disconnect
        </Button>
    );
}
