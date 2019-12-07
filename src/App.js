import './App.css';
import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Box, Image, Dropdown} from 'rbx';
import Cart from './components/cart.js'

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
          {sizes.map(size => <Button key = {size} color = "light"> {size} </Button>)}
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

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
  };
  return [ selected, toggle ];
};

const AddCart = ({state, product}) => {
  return (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Button onClick = {() => state.toggle(product.title)} variant="contained">Add To Cart</Button>
  </div>
  );
}


const Product = ({ state, product }) => (
  <Column size="one-quarter">
    <Container>
      <Box>
        <ProductImage product = {product} />
      </Box>
      <ProductPrice product = {product} />
      <ProductSize/>
      <ProductInfo product = {product} />
      <AddCart state = {state} product = {product} />
    </Container>
    
  </Column>
);

const ProductList = ({ state, products }) => (
  <Column.Group vcentered multiline>
    {products.map(product => <Product state = {state} key = {product.sku} product = { product } />)}
  </Column.Group>
);



const App = () => {
  const [data, setData] = useState({});
  const [selectedItem, toggle] = useSelection();
  console.log(selectedItem);
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    const fetchCart = async () => {
      const response = await fetch 
    }
    fetchProducts();
  }, []);

  return (
    <Container>
      <Banner title = {header.title} />
      
      <ProductList state = {{selectedItem, toggle}} products = {products} />
    </Container>
  );
};




export default App;
