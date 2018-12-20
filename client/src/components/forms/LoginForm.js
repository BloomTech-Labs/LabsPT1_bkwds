import React from "react"
import { Field, reduxForm } from "redux-form"

import { Input, Form, Button } from "../../theme/styledComponents"
import { validateLogin } from "./validations"

const LoginField = props => {
  const { input, meta, type, placeholder } = props
  return (
    <div>
      <Input type={type} placeholder={placeholder} {...input} />
      {meta.touched && meta.error ? (
        <div className="form-error">{meta.error}</div>
      ) : null}
    </div>
  )
}

let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="username"
        placeholder="Username or email"
        type="text"
        component={LoginField}
      />
      <Field
        name="password"
        placeholder="Password"
        type="password"
        component={LoginField}
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}

LoginForm = reduxForm({
  form: "login",
  validate: validateLogin
})(LoginForm)

export default LoginForm
