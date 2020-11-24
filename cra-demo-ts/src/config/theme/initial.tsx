import {themeTypes as types} from 'insulo-theme-provider';
import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import yellow from '@material-ui/core/colors/yellow'
import indigo from '@material-ui/core/colors/indigo'

export default { 
  type:  types.DARK,
  current: 'default',
  themes: [
    {
      id: 'default',
      props: {
        palette: {
          primary: indigo,
          secondary: pink,
        }
      },
    },
    {
      id: 'red-light',
      background: 'primary-light',
      selected: 'primary-main',
      props: {
        palette: {
          primary: red,
          secondary: yellow,
        }
      }
    },
    {
      id: 'red-main',
      background: 'primary-main',
      selected: 'primary-dark',
      props: {
        palette: {
          primary: red,
          secondary: yellow,
        }
      }
    },
    {
      id: 'green-light',
      background: 'secondary-light',
      selected: 'secondary-main',
      props: {
        palette: {
          primary: green,
          secondary: blue,
        }
      }
    },
    {
      id: 'green-main',
      background: 'secondary-main',
      selected: 'secondary-dark',
      props: {
        palette: {
          primary: green,
          secondary: blue,
        }
      }
    }
  ]
}
