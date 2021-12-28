import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getHeader from "app/headers/queries/getHeader"
import deleteHeader from "app/headers/mutations/deleteHeader"
export const Header = () => {
  const router = useRouter()
  const headerId = useParam("headerId", "number")
  const [deleteHeaderMutation] = useMutation(deleteHeader)
  const [header] = useQuery(getHeader, {
    id: headerId,
  })
  return (
    <>
      <Head>
        <title>Header {header.id}</title>
      </Head>

      <div>
        <h1>Header {header.id}</h1>
        <pre>{JSON.stringify(header, null, 2)}</pre>

        <Link
          href={Routes.EditHeaderPage({
            headerId: header.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteHeaderMutation({
                id: header.id,
              })
              router.push(Routes.HeadersPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowHeaderPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.HeadersPage()}>
          <a>Headers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
    </div>
  )
}

ShowHeaderPage.authenticate = true

ShowHeaderPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowHeaderPage
