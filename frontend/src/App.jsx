import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import About from './pages/About';
import AllBooks from './pages/AllBooks';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';
import Favourites from './components/Profile/Favourites';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBooks from './pages/UpdateBooks';

function App() {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])

  return (
    <>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/about-us" element={<About/>}/>
            <Route path="/all-books" element={<AllBooks/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/profile" element={<Profile/>}>
                {role==="user" ? <Route index element={<Favourites/>}/> : <Route index element={<AllOrders/>}/>}
                {role==="user" ? <Route path='/profile/orderHistory' element={<OrderHistory/>}/>:<Route path='/profile/add-books' element={<AddBook/>}/>}
                <Route path='/profile/settings' element={<Settings/>}/>
            </Route>
            <Route path='/update-books/:id' element={<UpdateBooks/>}/>
            <Route path="/logIn" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/view-book-details/:id" element={<ViewBookDetails/>}/>
          </Routes>
        <Footer />
    </>
  )
}

export default App
