import createTheme from 'styled-components-theme';

export const themeConfig = {
  primary:  '#0089bf',
  info: '#233237',
  danger: '#984B43',
  warning: '#fed82a',
  success: '#01885d',
  border: '#c5c5c5',
  dark:  '#312f32',
  medium: '#607D8B',
  light: '#ECEFF1',
  borderRadius: '3px',
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
