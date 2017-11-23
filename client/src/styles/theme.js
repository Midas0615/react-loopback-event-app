import createTheme from 'styled-components-theme';

export const themeConfig = {
  primary:  '#1976D2',
  genesis: '#212025',
  info: '#233237',
  danger: '#f44336',
  warning: '#FF9800',
  success: '#4CAF50',
  border: '#c5c5c5',
  dark:  '#212025',
  medium: '#484650',
  light: '#EDEDED',
  gray: '#a2acb9',
  dirtyWhite: '#f9f9f9',
  base: '#ffffff',
  borderRadius: '3px',
  fontDefault: '15px',
  fontTiny: '10px',
  fontSmall: '13px',
  fontLarge: '40px',
  fontGiant: '55px',
  fontFamily: 'Roboto',
}

themeConfig.flexboxgrid = {
  // Defaults
  gutterWidth: 1, // rem
  outerMargin: 1, // rem
  container: {
    sm: 46, // rem
    md: 61, // rem
    lg: 76  // rem
  },
  breakpoints: {
    xs: 0,  // em
    sm: 48, // em
    md: 64, // em
    lg: 75  // em
  }
}

const theme = createTheme(...Object.keys(themeConfig))
export default theme
