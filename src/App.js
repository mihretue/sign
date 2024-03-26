import Register from "./Register";
import Login from "./Login";
import Success from "./Success";
import { Route,Routes,BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/success' element={Success}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
