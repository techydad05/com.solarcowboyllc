import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSection from "app/sections/queries/getSection"
import deleteSection from "app/sections/mutations/deleteSection"
export const Section = () => {
  const router = useRouter()
  const sectionId = useParam("sectionId", "number")
  const [deleteSectionMutation] = useMutation(deleteSection)
  const [section] = useQuery(getSection, {
    id: sectionId,
  })
  return (
    <>
      <Head>
        <title>Section {section.id}</title>
      </Head>

      <div>
        <h1>Section {section.id}</h1>
        <pre>{JSON.stringify(section, null, 2)}</pre>

        <Link
          href={Routes.EditSectionPage({
            sectionId: section.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSectionMutation({
                id: section.id,
              })
              router.push(Routes.SectionsPage())
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

const ShowSectionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SectionsPage()}>
          <a>Sections</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Section />
      </Suspense>
    </div>
  )
}

ShowSectionPage.authenticate = true

ShowSectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSectionPage
