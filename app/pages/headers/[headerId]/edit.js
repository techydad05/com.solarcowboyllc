import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getHeader from "app/headers/queries/getHeader"
import updateHeader from "app/headers/mutations/updateHeader"
import { HeaderForm, FORM_ERROR } from "app/headers/components/HeaderForm"
export const EditHeader = () => {
  const router = useRouter()
  const headerId = useParam("headerId", "number")
  const [header, { setQueryData }] = useQuery(
    getHeader,
    {
      id: headerId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateHeaderMutation] = useMutation(updateHeader)
  return (
    <>
      <Head>
        <title>Edit Header {header.id}</title>
      </Head>

      <div>
        <h1>Edit Header {header.id}</h1>
        <pre>{JSON.stringify(header, null, 2)}</pre>

        <HeaderForm
          submitText="Update Header" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateHeader}
          initialValues={header}
          onSubmit={async (values) => {
            try {
              const updated = await updateHeaderMutation({
                id: header.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowHeaderPage({
                  headerId: updated.id,
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

const EditHeaderPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditHeader />
      </Suspense>

      <p>
        <Link href={Routes.HeadersPage()}>
          <a>Headers</a>
        </Link>
      </p>
    </div>
  )
}

EditHeaderPage.authenticate = true

EditHeaderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditHeaderPage
