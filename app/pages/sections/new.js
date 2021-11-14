import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSection from "app/sections/mutations/createSection"
import { SectionForm, FORM_ERROR } from "app/sections/components/SectionForm"

const NewSectionPage = () => {
  const router = useRouter()
  const [createSectionMutation] = useMutation(createSection)
  return (
    <div>
      <h1>Create New Section</h1>

      <SectionForm
        submitText="Create Section" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSection}
        // initialValues={{}}
        onSubmit={async (values) => {
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
    </div>
  )
}

NewSectionPage.authenticate = true

NewSectionPage.getLayout = (page) => <Layout title={"Create New Section"}>{page}</Layout>

export default NewSectionPage
