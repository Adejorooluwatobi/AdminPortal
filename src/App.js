// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';
import Login from './Pages/login';
import Register from './Pages/register';
import Index from './Pages';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NewSlider from './Pages/newSlider'; 
import Slider from './Pages/slider';
import NewProgram from './Pages/newProgram';
import Program from './Pages/program';
import EditProgram from './Pages/editProgram';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/index' element={<Index />} />
        <Route path='/newSlider' element={<NewSlider/>} />
        <Route path='/slider' element={<Slider/>} />
        <Route path='/newProgram' element={<NewProgram/>} />
        <Route path='/program' element={<Program/>} />
        <Route path='/editProgram/:id' element={<EditProgram/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
