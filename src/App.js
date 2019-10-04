import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Box, Image} from 'rbx';

var sizes = ["S", "M", "L", "XL"];

const header = {
  title: "Wildcat Closet"
};

const Banner = ({ title }) => (
  <Title size = {1}>{ title }</Title>
);

const getProductImagePath = product => (
  "data/products/" + product.sku.toString() + "_1.jpg"
);

const ProductImage = ({ product }) => (
  <Image.Container>
        <Image
          alt="Image"
          src= {getProductImagePath( product )}
        />
  </Image.Container>
);

const ProductPrice = ({ product }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
}}>
   ${product.price.toString()}
  </div>
)

const ProductSize = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
  <Button.Group>
        {sizes.map(size => <Button color = "light"> {size} </Button>)}
    </Button.Group>  
    
  </div>
    
);

const ProductInfo = ({ product }) => (
  <React.Fragment>
    <Title size = {6} textAlign="centered">
      { product.title }
    </Title>
    <Title subtitle size = {6} textAlign="centered">
      {product.description.length === 0 ? "No Description" : product.description.toString()}
    </Title>
  </React.Fragment> 
);

const Product = ({ product }) => (
  <Column size="one-quarter">
    <Box>
      <ProductImage product = {product} />
    </Box>
    <Container>
      <ProductPrice product = {product} />
      <ProductSize/>
      <ProductInfo product = {product} />
    </Container>
    
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
