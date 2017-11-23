import React from 'react'
import { Async } from 'react-select'
import { FormLabel } from 'components/Styled/Form'

export default (props) => {
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Async
        loadOptions={props.loadOptions}
        value={props.input.value}
        onChange={props.input.onChange}
        labelKey='name'
        {...props}
      />
    </div>
  )
}
