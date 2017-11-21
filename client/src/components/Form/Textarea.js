import React from 'react'
import Textarea from 'components/Styled/Textarea'
import { FormLabel } from 'components/Styled/Form'

export default (props) => {
  // debugger;
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Textarea {...props} {...props.input} />
    </div>
  )
}
