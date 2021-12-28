import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createHeader from "app/headers/mutations/createHeader"
import { HeaderForm, FORM_ERROR } from "app/headers/components/HeaderForm"

const NewHeaderPage = () => {
  const router = useRouter()
  const [createHeaderMutation] = useMutation(createHeader)
  return (
    <div>
      <h1>Create New Header</h1>

      <HeaderForm
        submitText="Create Header" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateHeader}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const header = await createHeaderMutation(values)
            router.push(
              Routes.ShowHeaderPage({
                headerId: header.id,
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
        <Link href={Routes.HeadersPage()}>
          <a>Headers</a>
        </Link>
      </p>
    </div>
  )
}

NewHeaderPage.authenticate = true

NewHeaderPage.getLayout = (page) => <Layout title={"Create New Header"}>{page}</Layout>

export default NewHeaderPage
