import { NAV_HEIGHT, APP_PADDING } from "../../constants";

export const SPACING_PX_VAL = 10;
export const SPACING_PX_TEXT = `${SPACING_PX_VAL}px`;

export const LIGHT_SHADOW = "0px 0px 10px 0px rgba(0, 0, 0, 0.05)";
export const LIGHT_SMALL_SHADOW = `0px 0px 10px rgba(0, 0, 0, 0.05)`;
export const PRIMARY_COLOR = "#000000";
export const BACKGROUND_COLOR = "#FCFCFC";

export const FONT_SIZES = {
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 16,
  body1: 16,
  body2: 14,
  caption: 12,
};
export const LINE_HEIGHT_MULTIPLIER = 1.3;
export const LETTER_SPACING = "0em";

export const FONT_WEIGHTS = { normal: 400, bold: 500, logo: 700 };
export const FULL_HEIGHT_WITH_NAV = `calc(100vh - ${NAV_HEIGHT * 2}px - ${
  SPACING_PX_VAL * APP_PADDING.mobile * 2
}px)`;
