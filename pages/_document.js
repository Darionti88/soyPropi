import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png' />
          <link rel='theme-color' content='#FFF' />

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;800&family=Hind:wght@400;600;700&family=Metrophobic&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #FCEFEF,#FCEFEF, #e1d5ef, #FCEFEF)",
          }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
