import React from "react"
import { ErrorMessage } from "formik"

import { Label, GhostInput, Button } from "../../styles/theme/styledComponents"

const CustomError = ({ name }) => (
  <ErrorMessage name={name}>
    {errorMessage => <div className="error client-error">{errorMessage}</div>}
  </ErrorMessage>
)

// Error Message needs to come first to
// make it easier to target Input as next sibling with CSS:
export const CustomInputWithError = ({
  values, // `values` is made available by Formik
  name, // Formik uses `name` to associate an Input with ErrorMessage
  type,
  placeholder,
  onChange,
  onBlur,
  showLabel,
  classNames = [] // allows you to override styling
}) => (
  <div className={classNames.length ? classNames.join(" ") : "form-field"}>
    <CustomError name={name} />
    {showLabel && <Label>{name}:</Label>}
    <GhostInput
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
  isSubmitting = false,
  classNames = [] // allows you to override styling
}) => (
  <div className="form-field">
    <Button
      className={classNames.length ? classNames.join(" ") : "btn-primary"}
      type="submit"
      disabled={isSubmitting}
    >
      {text}
    </Button>
    {submitError && (
      <div className="error server-error">{submitError.toString()}</div>
    )}
  </div>
)
