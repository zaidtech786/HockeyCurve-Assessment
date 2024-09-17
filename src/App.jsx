
import './App.css'
import Addtask from './pages/Addtask'
import Main from './pages/Main'
import {BrowserRouter as Router ,Route ,Routes} from "react-router-dom"

function App() {


  return (
    <>
   <Router>
    <Routes>
     <Route path = "/" element = { <Main/>}/>
     <Route path = "/task?/:id" element = {<Addtask/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App
