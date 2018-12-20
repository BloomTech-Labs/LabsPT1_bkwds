import React from "react"
import { Input } from "../../theme/styledComponents"

export const ValidatedInput = props => {
  const { input, meta, type, placeholder } = props
  return (
    <div>
      <Input type={type} placeholder={placeholder} {...input} />
      {meta.touched && meta.error ? (
        <div className="form-error">{meta.error}</div>
      ) : null}
    </div>
  )
}
