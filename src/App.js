import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Notification} from 'rbx';


const header = {
  title: "Wildcat Closet"
};

const Banner = ({ title }) => (
  <Title>{ title }</Title>
);

const Product = ({ product }) => (
  <Column size="one-quarter">
    <Notification textAlign="centered">
      { product.title }
    </Notification>
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
      {/* <ul>

        {products.map(product => <li key={product.sku}>{product.title}</li>)}
      </ul> */}
    </Container>
  );
};




export default App;
