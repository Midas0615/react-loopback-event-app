import createTheme from 'styled-components-theme';

export const themeConfig = {
  primary:  '#393276',
  info: '#4FC3F7',
  danger: '#F44336',
  warning: '#FFC107',
  success: '#CDDC39',
  border: '#CFD8DC',
  dark:  '#263238',
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
