import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFooter from "app/footers/queries/getFooter"
import deleteFooter from "app/footers/mutations/deleteFooter"
export const Footer = () => {
  const router = useRouter()
  const footerId = useParam("footerId", "number")
  const [deleteFooterMutation] = useMutation(deleteFooter)
  const [footer] = useQuery(getFooter, {
    id: footerId,
  })
  return (
    <>
      <Head>
        <title>Footer {footer.id}</title>
      </Head>

      <div>
        <h1>Footer {footer.id}</h1>
        <pre>{JSON.stringify(footer, null, 2)}</pre>

        <Link
          href={Routes.EditFooterPage({
            footerId: footer.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFooterMutation({
                id: footer.id,
              })
              router.push(Routes.FootersPage())
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

const ShowFooterPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FootersPage()}>
          <a>Footers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

ShowFooterPage.authenticate = true

ShowFooterPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowFooterPage
