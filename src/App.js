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
import NewProduct from './Pages/newProduct';
import Product from './Pages/product';
import EditProduct from './Pages/editProduct';
import Consultation from './Pages/consulatation';
import CardPaymentInfo from './Pages/cardPayment';
import About from './Pages/about';
import AboutEdit from './Pages/aboutEdit';
import Article from './Pages/article';
import ArticleNew from './Pages/articleNew';
import ArticleEdit from './Pages/articleEdit';
import Blog from './Pages/blog';
import BlogNew from './Pages/blogNew';
import BlogEdit from './Pages/blogEdit';
import Testimonial from './Pages/testimonial';
import TestimonialNew from './Pages/testimonialNew';
import TestimonialEdit from './Pages/testimonialEdit';

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
        <Route path='/newProduct' element={<NewProduct/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/editProduct/:id' element={<EditProduct/>} />
        <Route path='/consultation' element={<Consultation/>} />
        <Route path='/cardPayment' element={<CardPaymentInfo/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/aboutEdit' element={<AboutEdit/>} />
        <Route path='/article' element={<Article/>} />
        <Route path='/articleNew' element={<ArticleNew/>} />
        <Route path='/articleEdit/:id' element={<ArticleEdit/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/blogNew' element={<BlogNew/>} />
        <Route path='/blogEdit/:id' element={<BlogEdit/>} />
        <Route path='/testimonial' element={<Testimonial/>} />
        <Route path='/testimonialNew' element={<TestimonialNew/>} />
        <Route path='/testimonialEdit/:id' element={<TestimonialEdit/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
