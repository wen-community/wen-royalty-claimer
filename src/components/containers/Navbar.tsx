import {
  AppBar
} from "@mui/material";
import {
  LOGO_TEXT
} from "../../constants";
import { Row } from "../common";
import DesktopWallet from "./DesktopWallet";

export default function Navbar() {
  return (
    <AppBar
      elevation={0}
      sx={{
        p: 2,
        background: ({ palette }) => palette.background.default,
      }}
      position="fixed"
    >
      <Desktop />
    </AppBar>
  );
}

function Desktop() {
  return (
    <Row spaceBetween>
      <Logo />
      <DesktopWallet />
    </Row>
  );
}

const Logo = () => (
  <img alt="Wen Logo" src={LOGO_TEXT} width="70px" height="30px" />
);
