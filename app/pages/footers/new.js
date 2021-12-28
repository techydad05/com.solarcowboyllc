import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFooter from "app/footers/mutations/createFooter"
import { FooterForm, FORM_ERROR } from "app/footers/components/FooterForm"

const NewFooterPage = () => {
  const router = useRouter()
  const [createFooterMutation] = useMutation(createFooter)
  return (
    <div>
      <h1>Create New Footer</h1>

      <FooterForm
        submitText="Create Footer" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFooter}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const footer = await createFooterMutation(values)
            router.push(
              Routes.ShowFooterPage({
                footerId: footer.id,
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
        <Link href={Routes.FootersPage()}>
          <a>Footers</a>
        </Link>
      </p>
    </div>
  )
}

NewFooterPage.authenticate = true

NewFooterPage.getLayout = (page) => <Layout title={"Create New Footer"}>{page}</Layout>

export default NewFooterPage
