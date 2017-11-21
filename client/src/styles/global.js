import { injectGlobal } from 'styled-components'
import { themeConfig } from './theme'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    color: ${themeConfig.dark};
    font-family: 'Roboto';
    font-size: 15px;
    margin: 0;
  }
`
