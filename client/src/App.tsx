import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { useAppDispatch } from './hooks/redux';
import { Home, SignIn, SignUp } from './pages';
import { checkIfUserAuthorized } from './stateManager/actionCreators/auth';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIfUserAuthorized());
    }, []);

    return (
        <div className='app'>
            <Header />
            <main className='main'>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Navigate to={'/home'} />} />
                </Routes>
            </main>
            footer
        </div>
    );
}

export default App;
