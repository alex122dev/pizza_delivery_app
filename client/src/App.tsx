import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import {
  AllOrders,
  AllProducts,
  Cart,
  Home,
  NoAccess,
  Orders,
  Product,
  SignIn,
  SignUp,
} from './pages';
import { checkIfUserAuthorized } from './stateManager/actionCreators/auth';
import { getAllCategories } from './stateManager/actionCreators/categories';
import { setAllCartItems } from './stateManager/slices/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.orderItems);

  useEffect(() => {
    dispatch(checkIfUserAuthorized());
    dispatch(getAllCategories());

    const cartItemsFromLocalStorage = localStorage.getItem('pizzaDeliveryCart');
    if (cartItemsFromLocalStorage) {
      dispatch(setAllCartItems(JSON.parse(cartItemsFromLocalStorage)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pizzaDeliveryCart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className='app'>
      <Header />
      <main className='main'>
        <div className='container'>
          <ScrollToTop>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/products/:productId' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route
                path='/orders'
                element={
                  <RequireAuth>
                    <Orders />
                  </RequireAuth>
                }
              />
              <Route
                path='/allorders'
                element={
                  <RequireAuth requiredRoles={['ADMIN']}>
                    <AllOrders />
                  </RequireAuth>
                }
              />
              <Route
                path='/allproducts'
                element={
                  <RequireAuth requiredRoles={['ADMIN']}>
                    <AllProducts />
                  </RequireAuth>
                }
              />
              <Route path='/noaccess' element={<NoAccess />} />
              <Route path='/' element={<Navigate to={'/home'} />} />
            </Routes>
          </ScrollToTop>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
