import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { updateEmail, updatePassword } from "../../redux/actions/settings"
import { settingsValidations as validate } from "./formValidations"
import { authFormErrorsMixin } from "../../styles/theme/mixins"
import { UserPropTypes } from "../propTypes"

const SettingsFormStyles = styled.div`
  ${authFormErrorsMixin};
`

const SettingsForm = ({
  user,
  updateEmail,
  updatePassword,
  updateSettingsError
}) => (
  <Formik
    validate={validate}
    initialValues={{
      email: user.email,
      username: user.username,
      oldPassword: "",
      newPassword: ""
    }}
    onSubmit={({ email, oldPassword, newPassword }, actions) => {
      actions.setSubmitting(false)

      if (email !== user.email) {
        updateEmail(user.id, email)
      }

      if (oldPassword && newPassword) {
        updatePassword(user.username, oldPassword, newPassword)
      }
    }}
    render={({
      values,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting
    }) => (
      <SettingsFormStyles>
        <div className="register-form custom-form">
          <Form onSubmit={handleSubmit}>
            <CustomInputWithError
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              values={values}
              showLabel
            />
            <CustomInputWithError
              name="oldPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Old Password"
              values={values}
              showLabel
            />
            <CustomInputWithError
              name="newPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="New password"
              values={values}
              showLabel
            />
            <CustomButtonWithError
              text="Save"
              submitError={updateSettingsError}
              isSubmitting={isSubmitting}
            />
          </Form>
        </div>
      </SettingsFormStyles>
    )}
  />
)

SettingsForm.propTypes = {
  user: UserPropTypes.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  updateSettingsError: PropTypes.object
}

const mapStateToProps = state => ({
  updateSettingsError: state.settings.error,
  user: state.auth.user
})

const mapDispatchToProps = { updateEmail, updatePassword }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)
