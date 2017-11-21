import React from 'react'
import { Input } from 'components/Styled/Input'
import { FormLabel } from 'components/Styled/Form'

export default (props) => {
  // debugger;
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Input {...props.input} />
    </div>
  )
}
