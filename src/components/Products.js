function AdminControls({product, actions}) {
	return (
		<div className="controls">
			<button onClick={() => actions.navigateEdit(product._id)}>Edit</button>
			<button className="delete" onClick={() => actions.delete(product)}>Delete</button>
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
	return <p className={inStock ? "stock" : "out-of-stock"}>{inStock ? `${value} in stock` : "Out of stock"}</p>
}

function Product({isAdmin, product, adminActions, customerActions}) {
	const id = product._id;
	return (
		<div>
		<h3>{product.title}</h3>
		<img src={product.imageUrl}/>
		<p>{product.description}</p>
		<p>${product.price}</p>
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
