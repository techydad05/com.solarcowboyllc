import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFooters from "app/footers/queries/getFooters"
const ITEMS_PER_PAGE = 100
export const FootersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ footers, hasMore }] = usePaginatedQuery(getFooters, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <ul>
        {footers.map((footer) => (
          <li key={footer.id}>
            <Link
              href={Routes.ShowFooterPage({
                footerId: footer.id,
              })}
            >
              <a>{footer.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const FootersPage = () => {
  return (
    <>
      <Head>
        <title>Footers</title>
      </Head>
      <Link href="/">Home</Link>
      <div>
        <p>
          <Link href={Routes.NewFooterPage()}>
            <a>Create Footer</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FootersList />
        </Suspense>
      </div>
    </>
  )
}

FootersPage.authenticate = true

FootersPage.getLayout = (page) => <Layout>{page}</Layout>

export default FootersPage
