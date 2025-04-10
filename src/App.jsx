import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header/Header';
import  Footer  from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search/Search';
import { Cart } from './pages/Cart/Cart';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import './styles/global.css';

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/book/:id" element={<ProductDetails />} />
                    </Routes>
                </main>
                <Footer />
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;