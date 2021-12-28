import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFooter from "app/footers/queries/getFooter"
import updateFooter from "app/footers/mutations/updateFooter"
import { FooterForm, FORM_ERROR } from "app/footers/components/FooterForm"
export const EditFooter = () => {
  const router = useRouter()
  const footerId = useParam("footerId", "number")
  const [footer, { setQueryData }] = useQuery(
    getFooter,
    {
      id: footerId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateFooterMutation] = useMutation(updateFooter)
  return (
    <>
      <Head>
        <title>Edit Footer {footer.id}</title>
      </Head>

      <div>
        <h1>Edit Footer {footer.id}</h1>
        <pre>{JSON.stringify(footer, null, 2)}</pre>

        <FooterForm
          submitText="Update Footer" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFooter}
          initialValues={footer}
          onSubmit={async (values) => {
            try {
              const updated = await updateFooterMutation({
                id: footer.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowFooterPage({
                  footerId: updated.id,
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
    </>
  )
}

const EditFooterPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFooter />
      </Suspense>

      <p>
        <Link href={Routes.FootersPage()}>
          <a>Footers</a>
        </Link>
      </p>
    </div>
  )
}

EditFooterPage.authenticate = true

EditFooterPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditFooterPage
