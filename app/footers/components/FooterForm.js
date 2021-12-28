import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Field } from "react-final-form"
import { TextField } from "@mui/material"
export { FORM_ERROR } from "app/core/components/Form"
export function FooterForm(props) {
  return (
    <Form {...props}>
      {/* using this to figure out how to pass data and use custom fields */}
      {/* {JSON.stringify(props, null, 2)} */}
      <hr /><br />
      <Field name="name" placeholder="Footer Name" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.name : ""} />} />
      <Field name="title" placeholder="Footer Title" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.title : ""} />} />
      <Field name="content" placeholder="Footer Content" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.content : ""} />} />
      <Field name="logo" placeholder="Footer Logo" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.logo : ""} />} />
      <Field name="links" placeholder="Footer Links" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.links : ""} />} />
    </Form>
  )
}
