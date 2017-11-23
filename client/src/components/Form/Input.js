import React from 'react'
import { Input } from 'components/Styled/Input'
import { FormLabel } from 'components/Styled/Form'

export default (props) => {
  const showError = props.meta.touched && props.meta.error
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Input {...props} {...props.input} invalid={showError} />
      {showError && <small style={{color: 'red'}}>{props.meta.error}</small>}
    </div>
  )
}
