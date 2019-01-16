import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"

import { Button, Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { register, registerWithOauth } from "../../redux/actions/auth"
import { registerValidations as validate } from "./formValidations"
import { authFormErrorsMixin } from "../../styles/theme/mixins"
import Puff from "../icons/Puff"

const RegisterFormStyles = styled.div`
  ${authFormErrorsMixin};
`

const RegisterForm = ({ register, registerError, registerWithOauth }) => (
  <Formik
    validate={validate}
    initialValues={{
      email: "",
      username: "",
      password: "",
      passwordConfirm: ""
    }}
    onSubmit={(values, actions) => {
      actions.setSubmitting(false)
      register(values)
    }}
    render={({
      pending,
      values,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting
    }) => (
      <RegisterFormStyles>
        <div className="register-form custom-form">
          <Form onSubmit={handleSubmit}>
            <CustomInputWithError
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              values={values}
            />
            <CustomInputWithError
              name="username"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              values={values}
            />
            <CustomInputWithError
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              values={values}
            />
            <CustomInputWithError
              name="passwordConfirm"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm password"
              values={values}
            />
            {pending && <Puff width="32px" height="32px" />}
            {!pending && (
              <CustomButtonWithError
                text="Register"
                submitError={registerError}
                isSubmitting={isSubmitting}
              />
            )}
          </Form>
          <Button onClick={registerWithOauth}>Sign Up with Google</Button>
        </div>
      </RegisterFormStyles>
    )}
  />
)

const mapStateToProps = state => ({
  registerError: state.auth.error,
  pending: state.auth.pending
})

const mapDispatchToProps = { register, registerWithOauth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
