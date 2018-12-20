const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateLogin = values => {
  const errors = {}

  if (!values.username) errors.username = "Username or email is required"
  if (!values.password) errors.password = "Password is required"
  if (values.password && values.password.length < 8)
    errors.password = "Password must be at least 8 characters"

  return errors
}

export const validateRegistration = values => {
  const errors = {}

  if (!values.username) errors.username = "Username is required"
  if (!values.email) errors.email = "Email is required"
  if (!emailRegex.test(values.email))
    errors.email = "Please enter a valid email address"

  if (!values.password) errors.password = "Password is required"
  if (values.password && values.password.length < 8)
    errors.password = "Password must be at least 8 characters"

  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Passwords must match"
  }

  return errors
}
