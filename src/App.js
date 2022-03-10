//<Material
import { createTheme, ThemeProvider} from '@material-ui/core/styles'
import { pink, yellow, deepOrange} from '@material-ui/core/colors'
import { BrowserRouter as Router, } from 'react-router-dom'

import Routes from './Router/Routes'


const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: yellow,
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
  },
})


// socket.on('message', message => {
//     console.log(message);
// })

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
