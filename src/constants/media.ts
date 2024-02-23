import { MediaQuery } from "../types";

const MOBILE_WIDTH = 480;
const TABLET_WIDTH = 767;
const DESKTOP_MIN_WIDTH = 1000;
const HOMEPAGE_BP_WIDTH = 1150;
const WIDE_WIDTH = 1400;

const SM: MediaQuery = {
  below: `@media (max-width: ${MOBILE_WIDTH}px)`,
  above: `@media (min-width: ${MOBILE_WIDTH + 0.1}px)`,
};

const MD: MediaQuery = {
  below: `@media (max-width: ${TABLET_WIDTH}px)`,
  above: `@media (min-width: ${TABLET_WIDTH + 0.1}px)`,
};

const LG: MediaQuery = {
  below: `@media (max-width: ${DESKTOP_MIN_WIDTH}px)`,
  above: `@media (min-width: ${DESKTOP_MIN_WIDTH + 0.1}px)`,
};

const XL: MediaQuery = {
  below: `@media (max-width: ${HOMEPAGE_BP_WIDTH}px)`,
  above: `@media (min-width: ${HOMEPAGE_BP_WIDTH + 0.1}px)`,
};

const XXL: MediaQuery = {
  below: `@media (max-width: ${WIDE_WIDTH}px)`,
  above: `@media (min-width: ${WIDE_WIDTH + 0.1}px)`,
};

export const MEDIA = { SM, MD, LG, XL, XXL };
