// React + Router
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import CreateProduct from './components/CreateProduct';

// API + Domain
import productsApi from './api/products-api';
import Cart from './domain/Cart';

function App() {
	const [products, setProducts] = useState([]);
	const [shoppingCart, setShoppingCart] = useState(new Cart());

	useEffect(() => {
		getProducts();
	}, []);

	const navigate = useNavigate();

	async function getProducts() {
		const products = await productsApi.getAll();
		setProducts(products ?? []);
	}

	const customerActions = {
		add: (product) => {
			shoppingCart.add(product);
			setShoppingCart(new Cart(shoppingCart.items));
		},
		update: (product, quantity) => {
			shoppingCart.update(product, quantity);
			setShoppingCart(new Cart(shoppingCart.items));
		},
		remove: (product) => {
			shoppingCart.remove(product);
			setShoppingCart(new Cart(shoppingCart.items));
		}
	}

	const adminActions = {
		navigateEdit: (productId) => {
			navigate("/edit-product/" + productId);
		}
	}

	return (
	<div className="App">
		<Header title="Frontend Store®" cartItems={shoppingCart.totalItems}/>
		<Routes>
			<Route path="/" element={
				<Products isAdmin={false} products={products} customerActions={customerActions}/>
			} />
			<Route path="create-product" element={
				<CreateProduct/>
			}/>
			<Route path="edit-product/:productId" element={
				<CreateProduct/>
			}/>
			<Route path="/cart" element={
				<ShoppingCart items={shoppingCart.items} actions={customerActions}/>
			} />
			<Route path="/admin" element={
				<Products isAdmin={true} products={products} adminActions={adminActions}/>
			} />
		</Routes>
	</div>
	);
}

export default App;
