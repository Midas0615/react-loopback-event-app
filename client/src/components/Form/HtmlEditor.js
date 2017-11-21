import React from 'react'
import { Input } from 'components/Styled/Input'
import { FormLabel } from 'components/Styled/Form'
import ReactQuill from 'react-quill';

export default (props) => {
  // debugger;
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <ReactQuill {...props} {...props.input} />
    </div>
  )
}
