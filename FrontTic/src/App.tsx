
import { Route, BrowserRouter as Router,Routes} from 'react-router-dom'
import './style/global.css'
import Login from './Funcionalidades/Login'
import { ProdutoCads } from './Funcionalidades/ProdutoCads'
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/produtos" element={<ProdutoCads/>} />
        </Routes>
    </Router>
  )
}

export default App
