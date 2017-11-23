import createTheme from 'styled-components-theme';

export const themeConfig = {
  primary:  '#5188c0',
  info: '#233237',
  danger: '#e56557',
  warning: '#ec8b56',
  success: '#5fd080',
  border: '#c5c5c5',
  dark:  '#312f32',
  medium: '#607D8B',
  light: '#ECEFF1',
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
