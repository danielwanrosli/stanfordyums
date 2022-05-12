import { createMuiTheme } from '@material-ui/core/styles'
import { teal, orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#B83A4B',
      main: '#8C1515',
      dark: '#820000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
      openTitle: '#820000',
      protectedTitle: orange['700'],
      type: 'light'
    }
  })

  export default theme  