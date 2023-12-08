/* eslint-disable @typescript-eslint/no-shadow */
import { createRoot } from 'react-dom/client';
import ProductPage from './components/ProductPage';
import { products } from './data';
import App from './App';

const container = document.getElementById('root') as HTMLElement;

const url = window.location.href;

const renderComponent = () => {
  const root = createRoot(container);
  if (url.includes('product')) {
    root.render(<ProductPage products={products} />);
  } else {
    root.render(<App />);
  }
};

renderComponent();
