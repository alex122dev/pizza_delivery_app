import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { useAppDispatch } from './hooks/redux';
import { Home, Product, SignIn, SignUp } from './pages';
import { checkIfUserAuthorized } from './stateManager/actionCreators/auth';
import { getAllCategories } from './stateManager/actionCreators/categories';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIfUserAuthorized());
        dispatch(getAllCategories());
    }, []);

    return (
        <div className='app'>
            <Header />
            <main className='main'>
                <div className='container'>
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route
                            path='/products/:productId'
                            element={<Product />}
                        />
                        <Route path='/' element={<Navigate to={'/home'} />} />
                    </Routes>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
