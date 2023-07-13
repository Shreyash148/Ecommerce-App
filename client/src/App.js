import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { AuthProvider} from './context/contextapi';
import UserDashboard from './pages/user/UserDashboard';
import PrivateRoutes from './components/PrivateRoutes';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AdminRoutes } from './components/AdminRoutes';
import { CreateCategory } from './pages/admin/CreateCategory';
import { CreateProduct } from './pages/admin/CreateProduct';
import { Products } from './pages/admin/Products';
import { ManageOrders } from './pages/admin/ManageOrders';
import { ProductDetail } from './pages/view/ProductDetail';
import { Category } from './pages/view/Category';
import { Categoryproduct } from './pages/view/Categoryproduct';
import { CartProvider } from './context/cartcontext';
import { Cart } from './pages/view/Cart';
import { Profile } from './pages/user/Profile';
import { Orders } from './pages/user/Orders';

function App() {
  return (
    <>
    <AuthProvider>
      <CartProvider>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        
        <Route exact path='dashboard' element={<PrivateRoutes/>}>
          <Route exact path='user' element={<UserDashboard/>}/>
          <Route exact path='user-profile' element={<Profile/>}/>
          <Route exact path='user-orders' element={<Orders/>}/>
        </Route>
        <Route exact path='dashboard' element={<AdminRoutes/>}>
          <Route exact path='admin' element={<AdminDashboard/>}/>
          <Route exact path='admin-category' element={<CreateCategory/>}/>
          <Route exact path='admin-product' element={<CreateProduct/>}/>
          <Route exact path='admin-getproducts' element={<Products/>}/>
          <Route exact path='admin-orders' element={<ManageOrders/>}/>
        </Route>
        <Route exact path='/register' element={<Register user="customer"/>}/>
        <Route exact path='/admin-register' element={<Register user="admin"/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
        <Route exact path='/product/:id' element={<ProductDetail/>}/>
        <Route exact path='/category' element={<Category/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/category/:id' element={<Categoryproduct/>}/>
      </Routes>
    </Router>
    </CartProvider>
    </AuthProvider>
    </>
  );
}

export default App;
