// React + Router
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import Products from './components/Products';

// API
import productsApi from './api/products-api'

function App() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	async function getProducts() {
		const products = await productsApi.getAll();
		setProducts(products ?? []);
	}

	return (
	<div className="App">
		<Header title="Frontend Store®"/>
		<Routes>
			<Route path="/" element={
				<Products isAdmin={false} products={products}/>
			} />
			<Route path="/cart" element={
				<Products isAdmin={false} products={products}/>
			} />
			<Route path="/admin" element={
				<Products isAdmin={true} products={products}/>
			} />
		</Routes>
	</div>
	);
}

export default App;
