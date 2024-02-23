import { Theme as MuiTheme, SxProps } from "@mui/material";

export type MediaQuery = {
  above: string;
  below: string;
};

export type SxType = SxProps<MuiTheme>;
