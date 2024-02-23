import { ThemeOptions } from "@mui/material";
import { colorToAlpha } from "./util";
import { FONT_SIZES, PRIMARY_COLOR } from "./constants";

const HOVER_COLOR = colorToAlpha(PRIMARY_COLOR, 0.7);
const components: ThemeOptions["components"] = {
  MuiLink: {
    defaultProps: { target: "_blank" },
    styleOverrides: {
      root: {
        color: "#1D9BF0",
        textDecorationColor: "#1D9BF0",
      },
    },
  },
  MuiIconButton: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        svg: {
          fontSize: FONT_SIZES.h4,
        },
        padding: "15px",
        color: palette.text.primary,
        ":hover": {
          backgroundColor: colorToAlpha(PRIMARY_COLOR, 0.05),
        },
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
      variant: "contained",
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ ownerState: { variant } }) => ({
        fontWeight: 700,
        ":hover": {
          backgroundColor: variant === "contained" ? HOVER_COLOR : undefined,
        },
      }),
    },
  },
};

export default components;
