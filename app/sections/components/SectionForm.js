import { TextareaAutosize } from "@mui/core"
import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function SectionForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="link" label="Link" placeholder="Link" />
      {/* <LabeledTextField name="content" label="Content" placeholder="Content" /> */}
      {/* <TextareaAutosize
        name="content"
        label="Content"
        placeholder="Content"
        minRows={5}
      /> */}
    </Form>
  )
}
