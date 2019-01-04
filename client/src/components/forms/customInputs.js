import React from "react"
import { ErrorMessage } from "formik"

import { Input, Button } from "../../styles/theme/styledComponents"

const CustomError = ({ name }) => (
  <ErrorMessage name={name}>
    {errorMessage => <div className="error client-error">{errorMessage}</div>}
  </ErrorMessage>
)

// Error Message needs to come first to
// make it easier to select Input as next sibling
export const CustomInputWithError = ({
  values, // `values` is made available by Formik
  name, // Formik uses `name` to associate an Input with ErrorMessage
  type,
  placeholder,
  onChange,
  onBlur
}) => (
  <div className="form-field">
    <CustomError name={name} />
    <Input
      name={name}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      value={`${values[name]}`}
    />
  </div>
)

export const CustomButtonWithError = ({
  text,
  submitError,
  isSubmitting = false
}) => (
  <div className="form-field">
    <Button className="btn" type="submit" disabled={isSubmitting}>
      {text}
    </Button>
    {submitError && (
      <div className="error server-error">{submitError.toString()}</div>
    )}
  </div>
)
