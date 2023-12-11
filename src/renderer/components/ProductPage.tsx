/* eslint-disable react/function-component-definition */
// ProductPage.tsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Image,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  purchaseCount: number;
}

interface ProductPageProps {
  products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const url = window.location.href.toString();
  const path = decodeURIComponent(url).split('?')[1];
  const productId = path.split('=')[1];
  const product = products.find((p) => p.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleClose = () => {
    window.electron.ipcRenderer.send(
      'open-product-detail-window',
      JSON.stringify({ productId: parseInt(productId, 10), status: 'close' }),
    );
  };

  const handlePurchase = () => {
    window.electron.ipcRenderer.send(
      'purchase-product',
      JSON.stringify({ productId: parseInt(productId, 10) }),
    );
  };

  return (
    <ChakraProvider>
      <VStack spacing="4" align="center">
        <Text onClick={() => handleClose()} cursor="pointer">
          {' '}
          Back{' '}
        </Text>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={product.image} alt={product.name} />

          <Box p="6">
            <VStack spacing="1" align="start">
              <Text fontWeight="semibold" fontSize="lg">
                {product.name}
              </Text>
              <Text color="gray.500">{product.description}</Text>
              <Text fontSize="lg" fontWeight="bold">
                Price: ${product.price}
              </Text>
              <Button
                bg="ActiveBorder"
                fontWeight="bold"
                onClick={handlePurchase}
              >
                Purchase
              </Button>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default ProductPage;
