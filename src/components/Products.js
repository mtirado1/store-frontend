function AdminControls({product, actions}) {
	return (
		<div className="controls">
			<button onClick={() => actions.navigateEdit(product._id)}>Edit</button>
			<button className="delete" onClick={() => actions.remove(product)}>Delete</button>
		</div>
	);
}

function CustomerControls({product, actions}) {
	const inStock = (product.quantity ?? 0) !== 0;
	return (
		<div className="controls">
			<button disabled={!inStock} onClick={() => actions.add(product)}>Add to Cart</button>
		</div>
	);
}

function Quantity({value}) {
	const inStock = (value ?? 0) !== 0;
	if (inStock) return <p className="stock"><b>{value}</b> in stock</p>
	return <p className="out-of-stock">Out of stock</p>
}

function Product({isAdmin, product, adminActions, customerActions}) {
	const id = product._id;
	return (
		<div className="product">
		<h3>{product.title}</h3>
		<img src={product.imageUrl}/>
		<p>{product.description}</p>
		<p className="price">$<span className="number">{product.price}</span></p>
		<Quantity value={product.quantity}/>
			{
				isAdmin ?
				<AdminControls product={product} actions={adminActions}/>
				: <CustomerControls product={product} actions={customerActions}/>
			}
		</div>
	);
}

function Products({isAdmin, products, adminActions, customerActions}) {
	if (products.length === 0) {
		return <h2>No products available</h2>;
	}
	return (
		<div className="product-list">
			{products.map(product => {
				return <Product
					key={product._id}
					isAdmin={isAdmin}
					product={product}
					adminActions={adminActions}
					customerActions={customerActions}
				/>
			})}
		</div>
	);
}

export default Products;
