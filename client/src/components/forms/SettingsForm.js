import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import PropTypes from "prop-types"

import { UserPropTypes } from "../propTypes"
import { Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { updateEmail, updatePassword } from "../../redux/actions/settings"
import { settingsValidations as validate } from "./formValidations"
import { authFormErrorsMixin } from "../../styles/theme/mixins"
// import { UserPropTypes } from "../propTypes"

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
      oldPassword: "",
      newPassword: ""
    }}
    onSubmit={({ email, oldPassword, newPassword }, actions) => {
      actions.setSubmitting(false)

      if (email !== user.email) {
        updateEmail(user.id, email)
      }

      if (oldPassword && newPassword) {
        updatePassword(user.email, oldPassword, newPassword)
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
            />
            <CustomInputWithError
              name="oldPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Current password"
              values={values}
            />
            <CustomInputWithError
              name="newPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="New password"
              values={values}
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
  // TODO: Fix Redux issue where user is being stored differently on state
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
