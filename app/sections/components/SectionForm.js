import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Field } from "react-final-form"
import { Switch, TextField } from "@mui/material"
import { custom } from "zod"

export { FORM_ERROR } from "app/core/components/Form"
export function SectionForm(props) {
  return (
    <Form {...props}>
      {/* using this to figure out how to pass data and use custom fields */}
      {/* {JSON.stringify(props, null, 2)} */}
      <hr /><br />
      <Field name="name" placeholder="Section Name" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.name : ""} />} />
      <Field name="link" placeholder="Section Link" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.link : ""} />} />
      <Field name="video" placeholder="Video URL" type="text" component={(e) => <TextField {...e.input} initialValue={props.initialValues ? props.initialValues.video : ""} />} />
      <Field name="form" type="checkbox" component={(e) => <Switch {...e.input} value={props.initialValues ? props.initialValues.form : true} />} />
    </Form>
  )
}
