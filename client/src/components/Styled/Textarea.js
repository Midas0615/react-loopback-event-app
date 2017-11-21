import styled from 'styled-components'
import theme from 'styles/theme'


export default styled.textarea`
border: 1px solid ${theme.border};
padding: .5rem .5rem;
box-sizing: border-box;
outline: none;
font-family: ${theme.fontFamily};
font-size: 14px;
border-radius: ${theme.borderRadius};
width: 100%;
min-height: 100px;

&:focus {
  box-shadow: 0 0px 2px 0px rgba(79, 169, 255, 1);
  border: 1px solid rgba(79, 169, 255, 1);
}
&::-webkit-input-placeholder {
  color: ${theme.border};
}
&:disabled {
  background: ${theme.light};
}
`
