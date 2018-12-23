import React from "react"
import { Field, reduxForm } from "redux-form"

import { Form, Button } from "../../theme/styledComponents"
import { ValidatedInput } from "./customInputs"
import { validateLogin } from "./formValidations"

let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="username"
        placeholder="Username or email"
        type="text"
        component={ValidatedInput}
      />
      <Field
        name="password"
        placeholder="Password"
        type="password"
        component={ValidatedInput}
      />
      <Button className="btn" type="submit">
        Submit
      </Button>
    </Form>
  )
}

LoginForm = reduxForm({
  form: "login",
  validate: validateLogin
})(LoginForm)

export default LoginForm
