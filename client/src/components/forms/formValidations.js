import { validateEmail } from "../../utils/"

export const loginValidations = values => {
  let errors = {}
  if (!values.username) errors.username = "Username or email is required"
  if (!values.password) errors.password = "Password is required"
  if (values.password && values.password.length < 8)
    errors.password = "Password must be at least 8 characters"

  return errors
}

export const registerValidations = values => {
  let errors = {}
  if (!values.username) errors.username = "Username is required"
  if (!values.email) {
    errors.email = "Email is required"
  } else if (validateEmail(values.email)) {
    errors.email = "Invalid email address"
  }

  if (!values.password) errors.password = "Password is required"
  if (values.password && values.password.length < 8)
    errors.password = "Password must be at least 8 characters"
  if (
    values.password &&
    values.passwordConfirm &&
    values.password !== values.passwordConfirm
  ) {
    errors.passwordConfirm = "Passwords must match"
  }
  return errors
}

export const newTripValidations = values => {
  let errors = {}

  if (!values.name) errors.name = "Trip name is required"
  if (!values.start) errors.start = "Start date is required"
  if (!values.end) errors.end = "End date is required"
  if (!values.lat) errors.lat = "Latitude is required"
  if (!values.lon) errors.lon = "Longitude is required"
  // Make sure end date is later than start date:
  if (values.end && values.start > values.end) {
    errors.end = "Trip can't end before it starts"
  }

  return errors
}
