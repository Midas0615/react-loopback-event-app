import { injectGlobal } from 'styled-components'
import { themeConfig } from './theme'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500');

  body {
    color: ${themeConfig.dark};
    font-family: 'Roboto';
    background: ${themeConfig.light};
    font-size: 15px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
  }

  pre{
    display: inline-block;
    background: ${themeConfig.light};
    padding: 5px 12px;
    font-size: ${themeConfig.fontDefault};
    border-radius: ${themeConfig.borderRadius};
    margin: 0;
  }

  h1,h2,h3,h4,h5,h6{
    color: ${themeConfig.dark};
    font-weight: 400;
  }

`
