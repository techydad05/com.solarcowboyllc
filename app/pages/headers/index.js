import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getHeaders from "app/headers/queries/getHeaders"
const ITEMS_PER_PAGE = 100
export const HeadersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ headers, hasMore }] = usePaginatedQuery(getHeaders, {
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
        {headers.map((header) => (
          <li key={header.id}>
            <Link
              href={Routes.ShowHeaderPage({
                headerId: header.id,
              })}
            >
              <a>{header.name}</a>
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

const HeadersPage = () => {
  return (
    <>
      <Head>
        <title>Headers</title>
      </Head>
      <Link href="/">Home</Link>
      <div>
        <p>
          <Link href={Routes.NewHeaderPage()}>
            <a>Create Header</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <HeadersList />
        </Suspense>
      </div>
    </>
  )
}

HeadersPage.authenticate = true

HeadersPage.getLayout = (page) => <Layout>{page}</Layout>

export default HeadersPage
