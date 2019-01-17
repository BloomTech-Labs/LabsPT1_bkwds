import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"

import { Button, Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { login, loginWithOauth } from "../../redux/actions/auth"
import { loginValidations as validate } from "./formValidations"
import { authFormErrorsMixin } from "../../styles/theme/mixins"
import Puff from "../icons/Puff"

const LoginFormStyles = styled.div`
  ${authFormErrorsMixin};
`

// Get username and password from parent, if applicable
// (for example, after registering):
const LoginForm = ({
  username = "",
  password = "",
  login,
  loginError,
  loginWithOauth,
  pending
}) => (
  <Formik
    validate={validate}
    initialValues={{ username, password }}
    onSubmit={(values, actions) => {
      actions.setSubmitting(false)
      login(values)
    }}
    render={({
      values,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting
    }) => (
      <LoginFormStyles>
        <div className="login-form custom-form">
          <Form onSubmit={handleSubmit}>
            <div className="relative-positioning">
              <CustomInputWithError
                name="username"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Username or email"
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
              {pending && (
                <div className="spinner">
                  <Puff width="60px" height="60px" />
                </div>
              )}
              {!pending && (
                <CustomButtonWithError
                  text="Log in"
                  submitError={loginError}
                  isSubmitting={isSubmitting}
                  classNames={["btn-ghost"]}
                />
              )}
            </div>
            {pending && ""}
            {!pending && (
              <Button onClick={loginWithOauth}>Log in with Google</Button>
            )}
          </Form>
        </div>
      </LoginFormStyles>
    )}
  />
)

const mapStateToProps = state => ({
  loginError: state.auth.error,
  username: state.auth.user.username,
  pending: state.auth.pending
})

const mapDispatchToProps = { login, loginWithOauth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
