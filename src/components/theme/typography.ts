import { TypographyOptions } from "@mui/material/styles/createTypography";
import { MEDIA } from "../../constants";
import {
  FONT_SIZES,
  LINE_HEIGHT_MULTIPLIER,
  LETTER_SPACING,
  FONT_WEIGHTS,
} from "./constants";

const typography: TypographyOptions = {
  fontSize: 18,
  fontFamily:
    "Courier,Courier New,Lucida Sans Typewriter,Lucida Typewriter,monospace;",

  h1: {
    textTransform: "uppercase",
    fontSize: FONT_SIZES.h1,
    lineHeight: `${FONT_SIZES.h1 * LINE_HEIGHT_MULTIPLIER}px`,
    fontWeight: 600,
    letterSpacing: LETTER_SPACING,
    [MEDIA.SM.below]: {
      fontSize: FONT_SIZES.h2,
      lineHeight: `${FONT_SIZES.h2 * LINE_HEIGHT_MULTIPLIER}px`,
    },
  },
  h2: {
    textTransform: "uppercase",
    fontSize: FONT_SIZES.h2,
    lineHeight: `${FONT_SIZES.h2 * LINE_HEIGHT_MULTIPLIER}px`,
    fontWeight: 600,
    letterSpacing: LETTER_SPACING,
    [MEDIA.SM.below]: {
      fontSize: FONT_SIZES.h3,
      lineHeight: `${FONT_SIZES.h3 * LINE_HEIGHT_MULTIPLIER}px`,
    },
  },
  h3: {
    textTransform: "uppercase",
    fontSize: FONT_SIZES.h3,
    lineHeight: `${FONT_SIZES.h3 * LINE_HEIGHT_MULTIPLIER}px`,
    letterSpacing: LETTER_SPACING,
    fontWeight: 600,
  },
  h4: {
    fontSize: FONT_SIZES.h4,
    lineHeight: `${FONT_SIZES.h4 * LINE_HEIGHT_MULTIPLIER}px`,
    letterSpacing: LETTER_SPACING,
    fontWeight: 600,
  },
  body1: {
    fontSize: FONT_SIZES.body1,
    lineHeight: `${FONT_SIZES.body1 * LINE_HEIGHT_MULTIPLIER}px`,
    letterSpacing: LETTER_SPACING,
    fontWeight: FONT_WEIGHTS.normal,
  },
  body2: {
    fontSize: FONT_SIZES.body2,
    lineHeight: `${FONT_SIZES.body2 * LINE_HEIGHT_MULTIPLIER}px`,
    letterSpacing: LETTER_SPACING,
    fontWeight: FONT_WEIGHTS.normal,
  },
  caption: {
    fontSize: FONT_SIZES.caption,
    lineHeight: `${FONT_SIZES.caption * LINE_HEIGHT_MULTIPLIER}px`,
    letterSpacing: LETTER_SPACING,
    fontWeight: FONT_WEIGHTS.normal,
  },
};

export default typography;
