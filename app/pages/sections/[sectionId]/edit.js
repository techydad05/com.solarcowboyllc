import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSection from "app/sections/queries/getSection"
import updateSection from "app/sections/mutations/updateSection"
import { SectionForm, FORM_ERROR } from "app/sections/components/SectionForm"
import Editor from "app/core/components/Editor"
import { CircularProgress } from "@mui/material"

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
  // added this to set content before form submit
  const [formContent, setFormContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  return (
    <>
      <Head>
        <title>Edit Section {section.id}</title>
      </Head>
      <div className="center-div">
        {submitting ? <div className="submit-progress"><CircularProgress /></div> : null}
        <h1>Edit Section {section.id}</h1>
        <Editor width="100%" editorUpdate={(e) => setFormContent(e)} defaultValue={section.content} />
        <h3 style={{padding: 0, marginBottom: 0}}>Section ID: {section.id}</h3>
        <h3 style={{padding: 0, marginBottom: 0}}>Created: {new Date(section.createdAt).toLocaleString("en-US")}</h3>
        <h3 style={{padding: 0}}>Updated: {new Date(section.updatedAt).toLocaleString("en-US")}</h3>
        <SectionForm
          submitText="Update Section" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSection}
          initialValues={section}
          onSubmit={async (values) => {
            values.content = formContent
            setSubmitting(true)
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
              setSubmitting(false)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
        <p>
        <Link href={Routes.SectionsPage()}>
          <a>Back to Sections</a>
        </Link>
      </p>
      </div>
      <style jsx>{`
      #editor01 {
        width: 100% !important;
      }
      .center-div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 1rem;
      }
      .submit-progress {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        position: fixed;
        background-color: #FFF;
        opacity: 0.7;
        top: 0;
        left: 0;
        z-index: 99;
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
    </div>
  )
}

EditSectionPage.authenticate = true

EditSectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSectionPage
