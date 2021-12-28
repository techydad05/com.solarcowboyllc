import { Link, useQuery, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSection from "app/sections/mutations/createSection"
import { SectionForm, FORM_ERROR } from "app/sections/components/SectionForm"
import { Suspense, useEffect, useState } from "react"
import Editor from "app/core/components/Editor"
import db from "db"


const NewSectionPage = () => {
  const router = useRouter()
  const [createSectionMutation] = useMutation(createSection)
  const [formContent, setFormContent] = useState('')
  return (
    <div className="center-div">
      <h1>Create New Section</h1>
      <Editor editorUpdate={(e) => setFormContent(e)} />
      <SectionForm
        submitText="Create Section" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSection}
        // initialValues={{}}
        onSubmit={async (values) => {
          values.content = formContent
          try {
            const section = await createSectionMutation(values)
            router.push(
              Routes.ShowSectionPage({
                sectionId: section.id,
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
      <p>
        <Link href={Routes.SectionsPage()}>
          <a>Sections</a>
        </Link>
      </p>
      <style jsx>{`
        .center-div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

NewSectionPage.authenticate = true

NewSectionPage.getLayout = (page) => <Layout title={"Create New Section"}>{page}</Layout>

export default NewSectionPage
