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
		<Products isAdmin={false} products={products}/>
	</div>
	);
}

export default App;
