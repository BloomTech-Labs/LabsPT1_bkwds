import React from "react"
import { Input } from "../../theme/styledComponents"

export const ValidatedInput = props => {
  const { input, meta, type, placeholder } = props
  return (
    <div>
      {meta.touched && meta.error ? (
        <span className="form-error">{meta.error}</span>
      ) : null}
      <Input type={type} placeholder={placeholder} {...input} />
    </div>
  )
}

export const CustomInput = props => {
  const { input, type, placeholder } = props
  return (
    <div>
      <Input type={type} placeholder={placeholder} {...input} />
    </div>
  )
}
