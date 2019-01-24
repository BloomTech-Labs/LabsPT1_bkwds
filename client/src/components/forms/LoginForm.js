import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Button, Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { login, loginWithOauth } from "../../redux/actions/auth"
import { loginValidations as validate } from "./formValidations"
import { authFormErrorsMixin } from "../../styles/theme/mixins"
import { PuffIcon } from "../icons/Puff"
import GoogleIcon from "../icons/GoogleIcon"

const LoginFormStyles = styled.div`
  ${authFormErrorsMixin};
`

// Get email and password from parent, if applicable
// (for example, after registering):
const LoginForm = ({
  email = "",
  password = "",
  login,
  loginError,
  loginWithOauth,
  pending
}) => (
  <Formik
    validate={validate}
    initialValues={{ email, password }}
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
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email address"
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
                  <PuffIcon width="60px" height="60px" />
                </div>
              )}
              {!pending && (
                <CustomButtonWithError
                  text="Log in"
                  submitError={loginError}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
            {pending && ""}
          </Form>
          {!pending && (
            <Button
              className="btn-ghost"
              width="300px"
              onClick={loginWithOauth}
            >
              <GoogleIcon /> Log in with Google
            </Button>
          )}
        </div>
      </LoginFormStyles>
    )}
  />
)

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  loginWithOauth: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loginError: state.auth.error,
  email: state.auth.user.email,
  pending: state.auth.pending
})

const mapDispatchToProps = { login, loginWithOauth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
