import { Head, ErrorComponent, Link } from "blitz" // ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------

export default function Page404() {
  const statusCode = 404
  const title = <>
    This page could not be found<br /><Link href="/">Return Home</Link>
  </>
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent statusCode={statusCode} title={title} />
    </>
  )
}
