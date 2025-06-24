// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <title>El Que Busca Encuentra</title>

          {/* Favicon PNG */}
          <link rel="icon" type="image/png" sizes="32x32" href="/buscabien2-3.png" />

          {/* Si quieres usar otros tamaños para diferentes dispositivos */}
          <link rel="icon" type="image/png" sizes="16x16" href="/buscabien2-3.png" />
          <link rel="apple-touch-icon" href="/buscabien2-3.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
