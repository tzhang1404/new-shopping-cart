import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Box, Image} from 'rbx';


const header = {
  title: "Wildcat Closet"
};

const Banner = ({ title }) => (
  <Title size = {1}>{ title }</Title>
);

const getProductImagePath = product => (
  "data/products/" + product.sku.toString() + "_1.jpg"
);

const Product = ({ product }) => (
  <Column size="one-quarter">
    <Box>
      <Image.Container>
        <Image
          alt="Image"
          src= {getProductImagePath(product)}
        />
      </Image.Container>
    </Box>
    <Title subtitle textAlign="centered">
      { product.title }
    </Title>
  </Column>
);

const ProductList = ({ products }) => (
  <Column.Group vcentered multiline>
    {products.map(product => <Product key = {product.sku} product = { product } />)}
  </Column.Group>
);



const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Banner title = {header.title} />
      <ProductList products = {products} />
    </Container>
  );
};




export default App;
