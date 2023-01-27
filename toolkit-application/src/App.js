import './App.css';
import { Routes, Route} from 'react-router-dom';
import NavBar from './compounents/NavBar';
import Cards from './Cards';
import AllProducts from './compounents/All-products';
import ProductsDetails from './compounents/Products-details';



function App() {

  return (
    <div>
    <NavBar/>       
      <Routes>
          <Route path='/' element={<AllProducts/>} ></Route>
          <Route path='/cards' element={<Cards/>} ></Route>
          <Route path='/product-details/:productId' element={<ProductsDetails/>}></Route>
          {/* <Route path='/results' element={<SearchProduct/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
