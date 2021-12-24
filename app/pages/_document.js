import {
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript,
  /*DocumentContext*/
} from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }
  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script src="https://cloud9ide.github.io/emmet-core/emmet.js"></script>
        <script type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

        <script type="text/javascript">
          emailjs.init('user_sfHHqVix3VlKerTBKwc66')
        </script>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
