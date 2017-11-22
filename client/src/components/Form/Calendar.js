import React from 'react'
import DateTime from 'react-datetime'
import { FormLabel } from 'components/Styled/Form'
import { Input, InputGroup } from 'components/Styled/Input'
import Fa from 'components/Fa'
import moment from 'moment'
import { withState } from 'recompose'

const yesterday = DateTime.moment().subtract( 1, 'day' );
const valid = function( current ){
    return current.isAfter( yesterday );
};


const Calendar = (props) => {

  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <InputGroup fullWidth>
        <DateTime
          value={props.input.value}
          inputProps={{required: props.required }}
          onChange={props.input.onChange}
          isValidDate={valid}
          renderInput={(props) => <Input {...props} {...props.input} />}
        />
        <Fa icon='ion-ios-calendar-outline' gray input />
      </InputGroup>
    </div>
  )
}
export default withState('open', 'setOpen', false)(Calendar)
