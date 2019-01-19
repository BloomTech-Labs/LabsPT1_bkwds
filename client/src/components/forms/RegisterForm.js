import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Button, Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { register, registerWithOauth } from "../../redux/actions/auth"
import { registerValidations as validate } from "./formValidations"
import { authFormErrorsMixin } from "../../styles/theme/mixins"
import Puff from "../icons/Puff"
import GoogleIcon from "../icons/GoogleIcon"

const RegisterFormStyles = styled.div`
  ${authFormErrorsMixin};
`

const RegisterForm = ({
  register,
  registerError,
  registerWithOauth,
  pending
}) => (
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
            {pending && (
              <div className="spinner">
                <Puff width="60px" height="60px" />
              </div>
            )}
            {!pending && (
              <CustomButtonWithError
                text="Register"
                submitError={registerError}
                isSubmitting={isSubmitting}
              />
            )}
          </Form>
          {pending && ""}
          {!pending && (
            <Button
              className="btn-ghost"
              width="300px"
              onClick={registerWithOauth}
            >
              <GoogleIcon /> Sign Up with Google
            </Button>
          )}
        </div>
      </RegisterFormStyles>
    )}
  />
)

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  registerError: PropTypes.string,
  registerWithOauth: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  registerError: state.auth.error,
  pending: state.auth.pending
})

const mapDispatchToProps = { register, registerWithOauth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
