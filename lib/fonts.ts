import localFont from "next/font/local";

export const timesTen = localFont({
  src: [
    {
      path: "../public/fonts/times-ten/TimesTenBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-times-ten",
  display: "swap",
});
