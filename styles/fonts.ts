import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/** High-contrast editorial serif for display + dish names. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Applied to <body>; exposes the CSS variables the theme maps to. */
export const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`;
