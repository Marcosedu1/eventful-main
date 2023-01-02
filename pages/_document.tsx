import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme, { montSerrat } from "../src/theme/config";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt" className={montSerrat.className}>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="emotion-insertion-point" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
