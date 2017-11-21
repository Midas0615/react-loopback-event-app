import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { FormLabel } from 'components/Styled/Form'

const defaultStyles = {
  root: {
    position: 'relative',
    paddingBottom: '0px',
  },
  input: {
    display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    border: '1px solid #555555',
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
      <PlacesAutocomplete {...props} inputProps={props.input} styles={defaultStyles} />
    </div>
  )
}
