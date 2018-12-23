import React from "react"
import { Field, reduxForm } from "redux-form"

import { Form, Button } from "../../theme/styledComponents"
import { ValidatedInput } from "./customInputs"
import { validateRegistration } from "./formValidations"

let RegisterForm = props => {
  const { handleSubmit } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        component={ValidatedInput}
        placeholder="Email"
      />
      <Field
        name="username"
        type="text"
        component={ValidatedInput}
        placeholder="Username"
      />
      <Field
        name="password"
        type="password"
        component={ValidatedInput}
        placeholder="Password"
      />
      <Field
        name="confirmPassword"
        type="password"
        component={ValidatedInput}
        placeholder="Confirm Password"
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}

RegisterForm = reduxForm({
  form: "register",
  validate: validateRegistration
})(RegisterForm)

export default RegisterForm
