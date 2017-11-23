import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { FormLabel } from 'components/Styled/Form'
import Fa from 'components/Fa'
import { InputGroup } from 'components/Styled/Input'

const defaultStyles = {
  root: {
    position: 'relative',
    paddingBottom: '0px',
  },
  input: {
    display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '9px',
    fontSize: '0.9rem',
    outline: '0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#c5c5c5',
    borderRadius: '3px'
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    border: '1px solid #c5c5c5',
    marginTop: '-1px',
    width: '100%'
  },
  autocompleteItem: {
    backgroundColor: '#ffffff',
    padding: '10px',
    color: '#555555',
    cursor: 'pointer',
  },
  autocompleteItemActive: {
    backgroundColor: '#fafafa'
  },
  googleLogoContainer: {
    textAlign: 'right',
    padding: '1px',
    backgroundColor: '#fafafa',
    display: 'none'
  },
  googleLogoImage: {
    width: 150
  }
}


export default (props) => {
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <InputGroup fullWidth>
        <PlacesAutocomplete {...props} inputProps={props.input} styles={defaultStyles} />
        <Fa icon='ion-ios-location-outline' gray input />
      </InputGroup>
    </div>
  )
}
