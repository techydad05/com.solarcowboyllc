import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSections from "app/sections/queries/getSections"
const ITEMS_PER_PAGE = 100
export const SectionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ sections, hasMore }] = usePaginatedQuery(getSections, {
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
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={Routes.ShowSectionPage({
                sectionId: section.id,
              })}
            >
              <a>{section.name}</a>
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

const SectionsPage = () => {
  return (
    <>
      <Head>
        <title>Sections</title>
      </Head>
      <Link href="/">Home</Link>
      <div>
        <p>
          <Link href={Routes.NewSectionPage()}>
            <a>Create Section</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SectionsList />
        </Suspense>
      </div>
    </>
  )
}

SectionsPage.authenticate = true

SectionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SectionsPage
