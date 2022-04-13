// React + Router
import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

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
			setShoppingCart(new Cart(shoppingCart.items, shoppingCart.name, shoppingCart.address));
		},
		update: (product, quantity) => {
			shoppingCart.update(product, quantity);
			setShoppingCart(new Cart(shoppingCart.items, shoppingCart.name, shoppingCart.address));
		},
		remove: (product) => {
			shoppingCart.remove(product);
			setShoppingCart(new Cart(shoppingCart.items, shoppingCart.name, shoppingCart.address));
		},
		updateName: (name) => {
			setShoppingCart(new Cart(shoppingCart.items, name, shoppingCart.address));
		},
		updateAddress: (address) => {
			setShoppingCart(new Cart(shoppingCart.items, shoppingCart.name, address));
		},
		checkout: async () => {
			console.log("checkout");
			const request = shoppingCart.makeOrderRequest();
			console.log(request);
			const success = await productsApi.order(request);
			if (success) {
				navigate("/order-ok");
			} else {
				navigate("/order-error");
			}
		}
	}

	const adminActions = {
		navigateEdit: (productId) => {
			navigate("admin/edit-product/" + productId);
		},

		save: async (product, productId) => {
			if (productId) {
				const updatedProduct = await productsApi.update(productId, product);
				if (!updatedProduct) return;
				const otherProducts = products.filter(product => product._id !== productId);
				setProducts([updatedProduct, ...otherProducts]);
				navigate("/admin");
			} else {
				const createdProduct = await productsApi.create(product);
				console.log(createdProduct);
				if (!createdProduct) return;
				setProducts([createdProduct, ...products]);
				navigate("/admin");
			}
		},

		remove: async (product) => {
			const productId = product._id;
			if (await productsApi.remove(productId)) {
				const remainingProducts = products.filter(product => product._id !== productId);
				setProducts([...remainingProducts]);
			}
		}
	}

	return (
	<div className="App">
		<Header title="Frontend Store®" cartItems={shoppingCart.totalItems}/>
		<Routes>
			<Route path="/" element={
				<Products isAdmin={false} products={products} customerActions={customerActions}/>
			} />
			<Route path="/admin/create-product" element={
				<CreateProduct onSave={adminActions.save}/>
			}/>
			<Route path="/admin/edit-product/:productId" element={
				<CreateProduct onSave={adminActions.save}/>
			}/>
			<Route path="/cart" element={
				<ShoppingCart cart={shoppingCart} actions={customerActions}/>
			} />
			<Route path="/admin" element={
				<>
				<Link to="/admin/create-product">Add Product</Link>
				<Products isAdmin={true} products={products} adminActions={adminActions}/>
				</>
			} />
			<Route path="/order-ok" element={
				<>
				<h2>Product order successful!</h2>
				<Link to="/">Return to Home</Link>
				</>
			} />
			<Route path="/order-error" element={
				<>
				<h2>There was an error when processing your order.</h2>
				<Link to="/">Return to Home</Link>
				</>
			} />
		</Routes>
	</div>
	);
}

export default App;
