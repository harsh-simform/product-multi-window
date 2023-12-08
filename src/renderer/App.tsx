/* eslint-disable react/function-component-definition */
// App.tsx
import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import ProductsPage from './components/ProductsPage';
import { products } from './data';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage products={products} />} />
        <Route path="/product" element={<ProductPage products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;
