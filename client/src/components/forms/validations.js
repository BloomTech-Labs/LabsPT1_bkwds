export const validateLogin = values => {
  const errors = {}

  if (!values.username) errors.username = "Username or email is required"
  if (!values.password) errors.password = "Password is required"
  if (values.password && values.password.length < 8)
    errors.password = "Password must be at least 8 characters"

  return errors
}
