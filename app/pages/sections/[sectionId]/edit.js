import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSection from "app/sections/queries/getSection"
import updateSection from "app/sections/mutations/updateSection"
import { SectionForm, FORM_ERROR } from "app/sections/components/SectionForm"
import Editor from "app/core/components/Editor"

export const EditSection = () => {
  const router = useRouter()
  const sectionId = useParam("sectionId", "number")
  const [section, { setQueryData }] = useQuery(
    getSection,
    {
      id: sectionId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSectionMutation] = useMutation(updateSection)
  const [formContent, setFormContent] = useState('')
  return (
    <>
      <Head>
        <title>Edit Section {section.id}</title>
      </Head>

      <div className="center-div">
        <h1>Edit Section {section.id}</h1>
        <pre>{JSON.stringify(section, null, 2)}</pre>
        <Editor editorUpdate={(e) => setFormContent(e)} />
        <SectionForm
          submitText="Update Section" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSection}
          initialValues={section}
          onSubmit={async (values) => {
            values.content = formContent
            try {
              const updated = await updateSectionMutation({
                id: section.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowSectionPage({
                  sectionId: updated.id,
                })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        .center-div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

const EditSectionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSection />
      </Suspense>

      <p>
        <Link href={Routes.SectionsPage()}>
          <a>Sections</a>
        </Link>
      </p>
    </div>
  )
}

EditSectionPage.authenticate = true

EditSectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSectionPage
