/* eslint-disable no-plusplus */
/* eslint-disable react/function-component-definition */
// ProductsPage.tsx
import React, { useEffect } from 'react';
import { ChakraProvider, VStack, Text } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  purchaseCount: number;
}

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'purchase-count-increase',
      (_event: any, arg: string) => {},
    );
  }, []);

  const handleClick = (id: number) => {
    window.electron.ipcRenderer.send(
      'open-product-detail-window',
      JSON.stringify({ productId: id, status: 'open' }),
    );
  };
  return (
    <ChakraProvider>
      <VStack spacing="4" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Products List
        </Text>
        {products.map((product) => (
          <Text
            key={product.id}
            cursor="pointer"
            fontSize="lg"
            onClick={() => handleClick(product.id)}
          >
            {product.name} <br />
            Purchased count: {product.purchaseCount}
          </Text>
        ))}
      </VStack>
    </ChakraProvider>
  );
};

export default ProductsPage;
