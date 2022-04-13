import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import productsApi from '../api/products-api';

const emptyProduct = {
	title: "",
	description: "",
	price: 0,
	imageUrl: "",
	quantity: 0
}

function CreateProduct({onSave}) {
	const navigate = useNavigate();
	const {productId} = useParams();
	const [product, setProduct] = useState(emptyProduct);

	function isSaveDisabled() {
		return product.title === "" || product.imageUrl === "" || Number.isNaN(product.price) || !Number.isInteger(product.quantity) || Number(product.price) < 0 || Number(product.quantity) < 0;
	}

	function updateProduct(key, value) {
		const newProduct = {...product};
		newProduct[key] = value;
		setProduct(newProduct);
	}

	useEffect(() => {
		if (productId) {
			async function fetchData() {
				const newProduct = await productsApi.getOne(productId);
				if (newProduct) { setProduct(newProduct) }
			}
			fetchData();
		} else { setProduct(emptyProduct) }
	}, [productId]);

	return <form>
		<h2>{productId ? "Edit Product Details" : "Add a Product"}</h2>
		<h3>Title</h3>
		<input
			onChange={(event) => updateProduct("title", event.target.value)}
			type="text"
			name="Title"
			placeholder="Add a title..."
			value={product.title}>
		</input>
		<h3>Image URL</h3>
		<input
			onChange={(event) => updateProduct("imageUrl", event.target.value)}
			type="text"
			name="Image URL"
			placeholder="http://image.url.com"
			value={product.imageUrl}>
		</input>
		<h3>Description</h3>
		<textarea
			onChange={(event) => updateProduct("description", event.target.value)}
			type="textarea"
			name="Content"
			value={product.description}>
		</textarea>
		<h3>Price</h3>
		<input
			onChange={(event) => updateProduct("price", Number(event.target.value))}
			type="number"
			step="1"
			min="0"
			name="Price"
			value={product.price}
		/>
		<h3>Quantity</h3>
		<input
			onChange={(event) => updateProduct("quantity", Number(event.target.value))}
			type="number"
			className="price"
			name="Price"
			min="0"
			value={product.quantity}
		/>
		<p className="flex-row">
			<button type="button" disabled={isSaveDisabled()} onClick={() => {onSave(product, productId)}}>{productId ? "Update" : "Create"}</button>
			<button type="button" onClick={() => navigate("/admin")}>Cancel</button>
		</p>
	</form>;
}

export default CreateProduct;
