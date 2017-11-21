import React from 'react'
import Select from 'react-select'
import { FormLabel } from 'components/Styled/Form'



export default (props) => {
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Select
        options={props.options}
        value={props.input.value}
        onChange={props.input.onChange}
        labelKey='name'
        {...props}
      />
    </div>
  )
}
